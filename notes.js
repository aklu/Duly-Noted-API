import { promises as fs } from "fs";

export async function saveNotes(notes) {
    if (!Array.isArray(notes)) {
        throw new Error("notes argument must be an array");
      }
    await fs.writeFile("./data.json", JSON.stringify(notes, null, " "));
}

export async function getNotes(){ 
    let notesJSON;
    try {
        notesJSON = await fs.readFile("./data.json");
    }catch (error){

    }
    return notesJSON ? JSON.parse(notesJSON) : [];
}