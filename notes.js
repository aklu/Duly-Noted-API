import { promises as fs } from "fs";

let notes = [];

export async function saveNotes(notes){
    const fs = require('fs');

    //convert notes to json
    let jsonNotes = JSON.stringify(notes);

    //add information to file, append creates file if the file doesn't exist
    try {
        fs.appendFile("./data.json", jsonNotes);
    } catch (err){
        return;
    }

};

export async function getNotes(){ 
    let jsonContent = [];
    //check if data.json file exists. If it does, it will parse the json into an array. If not it will return an empty jsonContent array
    try {
        let contents = fs.readFileSync("/data.json");
        jsonContent = JSON.parse(contents);
        return jsonContent;
    }catch (err){
        return;
    }
};