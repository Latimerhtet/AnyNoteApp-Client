import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Plus from "../components/Plus";
import { Rings } from "react-loader-spinner";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState();
  const getNotes = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`);
    const notes = await response.json();
    setNotes(notes);
    setLoading(false);
  };
  useEffect(() => {
    getNotes();
  }, []);

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
  return (
    <section className="p-8 flex justify-center">
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
        <Plus />
      </div>
    </section>
  );
};

export default Home;
