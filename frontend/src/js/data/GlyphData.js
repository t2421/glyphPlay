import Vector2D from '../geom/Vector2D';

class GlyphData{
    constructor(){

    }

    load(callback){
        fetch('http://localhost:3000/font/')
        .then((response)=>{
            return response.json();
        })
        .then((json)=>{
            var data = this.formatRawData(json);
            callback(data);
        })
    }

    formatRawData(json){
        var data = [];
        json[0]["path"].map(path =>{
            var points = [];
            path[1].map(point => {
                points.push(new Vector2D(point[0],point[1]))
            });
            var obj = {
                "type":path[0],
                "points":points
            }
            data.push(obj);
        });
        return data;
    }

}

export default GlyphData;