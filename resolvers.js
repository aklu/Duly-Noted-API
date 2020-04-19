import cuid from "cuid";

const savedNotes = [];

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

      savedNotes.push(newNote);
      return newNote;
    },
    updateNote(_, args) {
      const { id, note } = args;

      const noteUpdate = savedNotes.find((savedNote) => savedNote.id === id);
      if (!noteToUpdate) {
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

      return updatedNote;
    },
    deleteNote(_, args){
      const { id } = args;

      const noteIndex = savedNotes.findIndex((savedNote) => savedNote.id === id);
      
      if (noteIndex < 0) {
        throw new Error("The id for this note could not be found");
      }

      const [removedNote] = savedNotes.splice(noteIndex, 1);

      return removedNote;
    }
  },
  Query: {
    note(_, args) {
      return savedNoted.find((note) => note.id === args.id);
    },
    notes(_, args) {
      const { includeArchive } = args;
      if(includeArchive){
        return savedNotes;
      }
      
      return savedNotes.Notes.filter((note) => !note.isArchived);
    }
  }
};