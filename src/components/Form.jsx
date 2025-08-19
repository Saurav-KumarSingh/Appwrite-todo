import db from "../appwrite/dbs";

const Form = ({ setNotes }) => {
  const handleAdd = async (e) => {
    e.preventDefault();
    const taskcontent = e.target.body.value.trim();

    if (!taskcontent) return;

    try {
      const payload = { body: taskcontent };
      const response = await db.tasks.create(payload);
      setNotes((prevState) => [response, ...prevState]);
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleAdd} className="flex gap-4 max-w-xl w-full mb-8">
      <input
        type="text"
        name="body"
        placeholder="🤔 What's on the agenda?"
        autoComplete="off"
        className="
          flex-grow
          px-5 py-3
          text-lg
          rounded-xl
          border border-gray-300
          placeholder-gray-400
          focus:outline-none
          focus:ring-1 focus:ring-blue-400 focus:border-blue-600
          shadow-sm
          transition
          duration-300
          ease-in-out
          hover:shadow-md
        "
      />
      <button
        type="submit"
        className="
        cursor-pointer
          bg-gradient-to-r from-blue-500 to-indigo-600
          text-white
          font-semibold
          px-6 py-3
          rounded-xl
          shadow-lg
          hover:from-blue-600 hover:to-indigo-700
          active:scale-95
          transition
          duration-200
          ease-in-out
          transform
          select-none
          focus:outline-none
          focus:ring-4 focus:ring-blue-400
        "
      >
        Add
      </button>
    </form>
  );
};

export default Form;
