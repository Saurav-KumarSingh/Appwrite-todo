import { useState } from "react";
import db from "../appwrite/dbs";

const Task = ({ notes, setNotes }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleDelete = async (id) => {
    try {
      await db.tasks.delete(id);
      setNotes(prevNotes => prevNotes.filter(note => note.$id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const startEditing = (task) => {
    setEditingId(task.$id);
    setEditText(task.body);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const submitUpdate = async (e, id) => {
    e.preventDefault();
    if (!editText.trim()) return;

    try {
      const payload = { body: editText.trim() };
      const updated = await db.tasks.update(id, payload);
      setNotes(prevNotes =>
        prevNotes.map(note => (note.$id === id ? updated : note))
      );
      cancelEditing();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const toggleCompleted = async (task) => {
    try {
      const payload = { completed: !task.completed };
      const updated = await db.tasks.update(task.$id, payload);
      setNotes(prevNotes =>
        prevNotes.map(note => (note.$id === task.$id ? updated : note))
      );
    } catch (error) {
      console.error("Failed to toggle completed:", error);
    }
  };

  return (
    <>
      {notes.map(task => (
        <div
          key={task.$id}
          className={`mt-4 max-w-xl w-full p-2 rounded-md ${
            task.completed ? "bg-green-700" : "bg-[#2f2f2fed]"
          }`}
        >
          <div className="flex justify-between items-center gap-4">
            <input
              type="checkbox"
              checked={task.completed || false}
              onChange={() => toggleCompleted(task)}
              className="cursor-pointer w-5 h-5"
              aria-label={`Mark task as ${
                task.completed ? "incomplete" : "complete"
              }`}
            />
            {editingId === task.$id ? (
              <form
                onSubmit={(e) => submitUpdate(e, task.$id)}
                className="flex flex-grow gap-2"
              >
                <input
                  type="text"
                  className="flex-grow px-3 py-1 rounded-md text-white"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="text-white px-4"
                  aria-label="Cancel edit"
                >
                  X
                </button>
              </form>
            ) : (
              <>
                <p
                  className={`flex-grow cursor-pointer ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                  onClick={() => startEditing(task)}
                  title="Click to edit"
                >
                  {task.body}
                </p>
                <button
                  onClick={() => startEditing(task)}
                  className="px-1.5 py-0.5 text-xl rounded mr-2 bg-[#3d3d3ded]"
                  aria-label="Edit task"
                >
                  &#x270D;
                </button>
                <button
                  onClick={() => handleDelete(task.$id)}
                  className="cursor-pointer text-red-500 text-xl px-1.5 py-0.5 rounded bg-[#3d3d3ded]"
                  aria-label="Delete task"
                >
                  &#x1F5D1;
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Task;
