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
      const { note } = args;

      const updateNote = { ...note };

      if (args.id !== note.id) {
        throw new Error('The id for this note did not match any id in the database');
      }

      if (args.note.isArchived === "boolean")  {
        updateNote.isArchived = args.note.isArchived;
        const now = new Date();
        updateNote.updatedAt = now.toISOString();      
      }

      if (args.note.isArchived !== "boolean")  {
     }

      if (typeof args.note.text === String) {
        updateNote.text = args.note.text;
        now = new Date();
        updateNote.updatedAt = now.toISOString();    
      }

      if (typeof args.note.text !== String) {
      }

      savedNotes.find((note) => {
        if(note.id === args.id){
          note.isArchived = updateNote.isArchived;
          note.text = updateNote.text;
          note.updateAt = updateNote.updateAt;
        }
      });

      return updateNote;
    },
    deleteNote(_, args){
      const { note } = args;

      const deleteNote = { ...note };

      if (args.id !== deleteNote.id) {
        throw new Error('The id for this note did not match any id in the database');
      }

      const deletedNotes = notes.filter((note) => note.id !== deleteNote.id);
      savedNotes = deletedNotes;

      return deleteNote;
    }
  },
  Query: {
    note(_, args) {
      return savedNoted.find((note) => note.id === args.id);
    },
    notes() {
      if(isArchived !== "boolean" || isArchived === false){
        savedNotes = notes.filter((note) => note.isArchived !== true);
      }
      if (showArchive) {
        savedNotes;
      }
      return savedNotes;
    }
  }
};