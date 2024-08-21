import React, { useContext, useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Plus from "../components/Plus";
import { Rings } from "react-loader-spinner";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Alert, Slide, Snackbar } from "@mui/material";
const Home = () => {
  const { token, setSnackBarOpen, snackbarOpen, snackbarMsg, severity } =
    useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasPre, setHasPre] = useState(true);
  const [hasNext, setHasNext] = useState(true);
  const [totalNotesAvailable, setTotalNotes] = useState(null);
  const [totalPagesAvailable, setTotalPages] = useState(null);

  const getNotes = async (pageNo) => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/notes?page=${pageNo}`
    );
    const { notes, totalNotes, totalPages } = await response.json();
    setNotes(notes);
    setTotalNotes(totalNotes);
    setTotalPages(totalPages);
    setLoading(false);
  };
  useEffect(() => {
    getNotes(currentPage);
  }, [currentPage]);

  const customAlert = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: "Bounce",
    });
  };

  const handlePre = () => {
    if (currentPage > 1) {
      setCurrentPage((pre) => pre - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPagesAvailable) {
      setCurrentPage((pre) => pre + 1);
    }
  };
  // handling cloase or open for snackbar alert box
  const handleClose = () => {
    setSnackBarOpen(false);
  };
  return (
    <section className="p-8 flex justify-center">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={Slide}
        key={Slide}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled">
          {snackbarMsg}
        </Alert>
      </Snackbar>
      <div className="flex gap-5 flex-wrap">
        {!loading && notes.length > 0 ? (
          <>
            {notes.map((note) => {
              return (
                <NoteCard
                  key={note._id}
                  note={note}
                  getNotes={getNotes}
                  customAlert={customAlert}
                />
              );
            })}
          </>
        ) : (
          <div className="w-full mt-20 flex justify-center items-center">
            <Rings
              visible={loading}
              height="80"
              width="80"
              color="#c026d3"
              ariaLabel="rings-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        {!loading && notes.length < 1 && <p>You haven't added any note yet</p>}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        {/* Same as */}
        <ToastContainer />
        {token && <Plus />}

        <div className="flex items-center justify-center gap-5 w-full">
          {currentPage !== 1 && currentPage < totalPagesAvailable && (
            <>
              <button
                className="p-3 border-2 border-fuchsia-600 rounded-full text-fuchsia-600"
                onClick={handlePre}
              >
                <ChevronLeftIcon />
              </button>
              <button
                className="p-3 border-2 border-fuchsia-600 rounded-full text-fuchsia-600"
                onClick={handleNext}
              >
                <ChevronRightIcon />
              </button>
            </>
          )}
          {currentPage !== 1 && currentPage == totalPagesAvailable && (
            <button
              className="p-3 border-2 border-fuchsia-600 rounded-full text-fuchsia-600"
              onClick={handlePre}
            >
              <ChevronLeftIcon />
            </button>
          )}
          {currentPage == 1 && currentPage < totalPagesAvailable && (
            <button
              className="p-3 border-2 border-fuchsia-600 rounded-full text-fuchsia-600"
              onClick={handleNext}
            >
              <ChevronRightIcon />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
