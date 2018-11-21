const opentype = require("opentype.js");

const commandMap = {
    "M":"moveTo",
    "C":"curveTo",
    "L":"lineTo",
    "Z":"closePath",
    "Q":"quadTo"
}

const getPath =  () => {
    var font = opentype.loadSync('fonts/NotoSerifCJKjp-Medium.otf');
    var path = font.getPath('文字', 0, 500, 500);
    var commands = path.commands;
    var allPath = [];
    commands.map((element)=>{
        var type = commandMap[element.type];
        var commandsArr = []
        commandsArr[0] = type;
        commandsArr[1] = [];
        setLoc(commandsArr[1],element);
        allPath.push(commandsArr);
    })
    var returnObj = [
        {
            "path":allPath
        }
    ]
    return returnObj;
}

function setLoc(arr,commandItem){
    if(commandItem.x1 && commandItem.y1){
        arr.push([commandItem.x1,commandItem.y1]);
    }
    if(commandItem.x2 && commandItem.y2){
        arr.push([commandItem.x2,commandItem.y2]);
    }
    if(commandItem.x && commandItem.y){
        arr.push([commandItem.x,commandItem.y]);
    }else{
        arr.push([]);
    }
    
}

exports.getPath = getPath;