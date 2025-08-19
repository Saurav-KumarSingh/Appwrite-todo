import { useEffect, useState } from "react";
import db from "../appwrite/dbs";
import Form from "../components/Form";
import Task from "../components/Task";
import { Query } from "appwrite";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const init = async () => {
    const response = await db.tasks.list([Query.orderDesc("$createdAt")]);
    setNotes(response.documents);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <Form setNotes={setNotes} />
      <Task notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default Notes;
