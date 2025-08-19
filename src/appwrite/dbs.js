import { database } from "./config";
import { ID } from "appwrite";

const db = {};

const collections = [
    {
        dbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        id: import.meta.env.VITE_APPWRITE_COLLECTION_TASKS_ID,
        name: "tasks",
    },
];

collections.forEach((col) => {
    db[col.name] = {
        create: (payload, permissions, id = ID.unique()) =>
            database.createDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        update: (id, payload, permissions) =>
            database.updateDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        delete: (id) => database.deleteDocument(col.dbId, col.id, id),

        list: (queries = []) =>
            database.listDocuments(col.dbId, col.id, queries),

        get: (id) => database.getDocument(col.dbId, col.id, id),
    };
});

export default db;