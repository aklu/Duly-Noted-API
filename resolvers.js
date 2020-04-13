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
    }
  },
  Query: {
    note(_, args) {
      return savedNoted.find((note) => note.id === args.id);
    },
    notes() {
      return savedNotes;
    }
  }
};