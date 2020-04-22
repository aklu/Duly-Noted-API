import cuid from "cuid";
import { getNotes }  from "./notes.js";
import { saveNotes } from "./notes.js";


export default {

  Mutation: {
    async createNote(_, args) {
      const savedNotes = await getNotes();

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

      savedNotes.push(newNote);

      await saveNotes(savedNotes);
      return newNote;
    },
    async updateNote(_, args) {
      const { id, note } = args;

      const savedNotes = await getNotes();

      const noteUpdate = savedNotes.find((n) => n.id === id);
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
      for (const savedNote of savedNotes) {
        if (savedNote.id === id) {
          Object.assign(savedNote, updateNote);
          updatedNote = savedNote;
          break;
        }
      }

      savedNotes.push(updatedNote);

      await saveNotes(savedNotes);
      return updatedNote;
    },
    async deleteNote(_, args){
      let savedNotes = await getNotes();

      const { id } = args;

      const noteIndex = savedNotes.findIndex((n) => n.id === id);
      
      if (noteIndex < 0) {
        throw new Error("The id for this note could not be found");
      }

      const [removedNote] = savedNotes.splice(noteIndex, 1);

      await saveNotes(savedNotes);
      return removedNote;
    }
  },
  Query: {
    async note(_, args) {
      const savedNotes = await getNotes();

      return savedNotes.find((n) => n.id === args.id);
    },
    async notes(_, args) {
      const savedNotes = await getNotes();

      const { includeArchived } = args;
      if(includeArchived){
        return savedNotes;
      }
      
      return savedNotes.filter((n) => !n.isArchived);
    }
  }
};