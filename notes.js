import { promises as fs } from "fs";

export async function saveNotes(notes){
    //add information to file, append creates file if the file doesn't exist

    try {
        fs.appendFile("data.json", JSON.stringify(notes), (err) => {
            console.log(err)
        });
    } catch (err){
        throw(err);
    }
};

export async function getNotes(){ 
    //check if data.json file exists. If it does, it will parse the json into an array. If not it will return an empty jsonContent array
    try {
        fs.readFile("data.json", (err, data) => {
            if(err) throw err;
            let jsonContent = JSON.parse(data);
            return jsonContent;
        });
    }catch (err){
        throw (err);
    }

};