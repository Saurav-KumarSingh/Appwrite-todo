import { useEffect, useState } from "react"
import { database } from "../appwrite/config"

const Notes = () => {

    const [notes,setNotes]=useState([])

    

    const init=async()=>{
        const response=await database.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_TASKS_ID
        );

        setNotes(response.documents);
    }

    useEffect(()=>{
        init();
    },[]);
  return (
    <div>
        {
            notes.map(note=>(
                <div key={note.$id}>
                    {note.body}
                </div>
            ))
        }
    </div>
  )
}

export default Notes