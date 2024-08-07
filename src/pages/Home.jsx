import React from "react";
import NoteCard from "../components/NoteCard";
import Plus from "../components/Plus";
const Home = () => {
  return (
    <section className="p-8 flex gap-5 flex-wrap">
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <Plus />
    </section>
  );
};

export default Home;
