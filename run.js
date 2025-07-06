var XLSX = require("xlsx");
var prompt = require('prompt-sync')();
var fs=require("fs")
console.log("All Data in that has been processing! Please verify the Setting")
var filename = prompt('Full File Path ( like C:/desktop):- ');
var s1 = prompt("Sheet 1 name (like fruits is the sheet 1 name):- ")
var s2 = prompt("Sheet 2 name (like vegetable is the sheet 2 name):- ")
var k = prompt("Enter Key for comparing (same in the sheet heading):- ")

FilePath = filename
Sheet_name1 = s1
Sheet_name2 = s2
keyname = k

console.log("File Path Set to = " +FilePath)
console.log("Sheet1 name  = " +Sheet_name1)
console.log("Sheet2 name = " +Sheet_name2)
console.log("Key Which you use to compare Data = " +keyname)

var files = fs.readdirSync(FilePath);
//main program
files.forEach((FileName) => {
    extension = FileName.split(".")

    if (extension[extension.length - 1] == "xlsx") {
        var workbook = XLSX.readFile(FilePath+"/" + FileName);

        var all = XLSX.utils.sheet_to_json(workbook.Sheets[Sheet_name1]);
        var cb = XLSX.utils.sheet_to_json(workbook.Sheets[Sheet_name2]);

        //newArr1 is all to cb i.e. in (all) the data exist but in (cb) it is not exist
        //newArr2 is cb to all
        newArr1 = all.filter(x => !cb.some(y => y[keyname] == x[keyname]))
        newArr2 = cb.filter(x => !all.some(y => y[keyname] == x[keyname]))
        const workbookoutput = XLSX.utils.book_new();
        const alltocb = XLSX.utils.json_to_sheet(newArr1);
        const cbtoall = XLSX.utils.json_to_sheet(newArr2);
        XLSX.utils.book_append_sheet(workbookoutput, alltocb, Sheet_name1 + "_to_" + Sheet_name2);
        XLSX.utils.book_append_sheet(workbookoutput, cbtoall, Sheet_name2 + "_to_" + Sheet_name1);
        XLSX.writeFile(workbookoutput, FilePath + "/output" + FileName, { compression: true });
    }

});