import { promises as fs } from "fs";

export async function saveNotes(notes){
    
    //add information to file, append creates file if the file doesn't exist
    try {
        fs.appendFile("data.json", JSON.stringify(data), (err) => {
            console.log(err)
        });
    } catch (err){
    }
};

export async function getNotes(){ 
    let jsonContent = [];
    //check if data.json file exists. If it does, it will parse the json into an array. If not it will return an empty jsonContent array
    try {
        let contents = fs.readFile("data.json");
        jsonContent = JSON.parse(contents);
        return jsonContent;
    }catch (err){
        return;
    }
};