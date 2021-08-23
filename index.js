#!/usr/bin/env node

const fs = require("fs");
let arguments = process.argv.slice(2); //slice to get file names
let flag = [];
let filenames = [];
let secondaryargs = []
for (let i of arguments) {
    if (i[0] == '-') {
        flag.push(i); //to check flag starting with -
    } else if (i[0] == "$") { //to check for the reg $! like this
        secondaryargs.push(i.slice(1));
    } else {
        filenames.push(i);
    }
}

if (flag.length == 0 && filenames.length != 0) { //reading both the files when no flag
    for (let file of filenames) {
        console.log(fs.readFileSync(file, "utf-8"));
    }
} else if (filenames.length != 0) {
    for (let file of filenames) {
        let fileData = fs.readFileSync(file, "utf-8");
        for (let fl of flag) {
            if (fl == "-rs") {
                fileData = removeAll(fileData, " ");

            }
            if (fl == "-rn") {
                fileData = removeAll(fileData, "\r\n");

            }
            if (fl == '-rsc') {
                for (let secArg of secondaryargs) {
                    fileData = removeAll(fileData, secArg);
                }
            }
            if (fl == '-wf') {
                fs.writeFileSync(file, fileData);
            }
            if(flag=="-s"){                let data=addSequence(fileData);

                    let data1=addSequence(fileData);
                    console.log(data1)
            }
            if(flag=="-sn"){
                let data=addSequenceTnel(fileData);
                console.log(data);
            }
            if(flag=="-rel"){
                let ans=removeExtraLine(fileData);
                for(let i=0;i<ans.length;i++){
                    console.log(ans[i]);
                }
        }
        // console.log(fileData);

    }
}
function removeExtraLine(fileData){
    let contentArr=fileData.split("\n");
    let data=[];
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }
        if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }

    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            data.push(contentArr[i]);
        }
    }
    return data;
}
function addSequence(content)
{
    let contentarr=content.split("\n");
    for(let i=0;i<contentarr.length;i++)
    {
        contentarr[i]=(i+1)+" "+contentarr[i];
    }
    return contentarr;
}
function addSequenceTnel(content)
{
    let contentArr=content.split("\n");
    let counter=1;
    for(let i=0;i<contentArr.length;i++)
    {
        if(contentArr[i]!="")
        {
            contentArr[i]=counter+" "+contentArr[i];
            counter++;
        }
    }
    return contentArr;
}
function removeAll(data, remove) 
{
    return data.split(remove).join("");
}
}