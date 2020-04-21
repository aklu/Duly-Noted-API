import cuid from "cuid";
import { getNotes }  from "./notes.js";
import { saveNotes } from "./notes.js";

let notes = getNotes();

export default {

  Mutation: {
    createNote(_, args) {
      const { note } = args;

      const newNote = { ...note };
 
      if (!newNote.id) {
        newNote.id = cuid();
      }

      if (!newNote.createdAt) {
        const now = new Date();
        newNote.createdAt = now.toISOString();
      }

      if (!newNote.updateAt) {
        const now = new Date();
        newNote.updatedAt = now.toISOString();
      }

      if (typeof newNote.isArchived !== "boolean") {
        newNote.isArchived = false;
      }

      saveNotes(newNote);
      return newNote;
    },
    updateNote(_, args) {
      const { id, note } = args;

      const noteUpdate = notes.find((n) => n.id === id);
      if (!noteUpdate) {
        throw new Error('The id for this note could not be found');
      }

      const updateNote = { ...note };

      if (typeof updateNote.isArchived === "boolean" || typeof updateNote.text === "string")  {
        const now = new Date();
        updateNote.updatedAt = now.toISOString();      
      }
      else {
        return noteUpdate;
      }

      let updatedNote;
      for (const notes of notes) {
        if (notes.id === id) {
          Object.assign(notes, updateNote);
          updatedNote = notes;
          break;
        }
      }

      saveNotes(notes);
      return updatedNote;
    },
    deleteNote(_, args){
      const { id } = args;

      const noteIndex = notes.findIndex((n) => n.id === id);
      
      if (noteIndex < 0) {
        throw new Error("The id for this note could not be found");
      }

      const [removedNote] = notes.splice(noteIndex, 1);

      saveNotes(notes);
      return removedNote;
    }
  },
  Query: {
    note(_, args) {

      return notes.find((n) => n.id === args.id);
    },
    notes(_, args) {

      const { includeArchived } = args;
      if(includeArchived){
        return notes;
      }
      
      return notes.filter((n) => !n.isArchived);
    }
  }
};