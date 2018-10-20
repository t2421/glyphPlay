import Vector2D from '../geom/Vector2D';
import MoveToSegment from '../shape/MoveToSegment';
import LineSegment from '../shape/LineSegment';
import CubicBezierSegment from '../shape/CubicBezierSegment';
import Path from '../shape/Path';

class PathUtil{
    static createPathSet(fontInfo){
        var pathSet = [];
        var penLoc = undefined;
        var start = undefined;
        
        for(var idx in fontInfo){
            var lineInfo = fontInfo[idx];
            var vector = lineInfo.points;

            if(lineInfo.type == "moveTo"){
                var path = new Path();
                penLoc = vector[0]
                start = vector[0];
                path.add(new MoveToSegment(penLoc,vector))
            }
            if(lineInfo.type == "lineTo"){
                path.add(new LineSegment(penLoc,vector));
                penLoc = vector[0]
            }
            if(lineInfo.type == "curveTo"){
                path.add(new CubicBezierSegment(penLoc,vector));                
                penLoc = vector[2]
            }
            if(lineInfo.type == "closePath"){
                path.add(new LineSegment(penLoc,[start]));
                pathSet.push(path);
            }
        }
		return pathSet
    }

    static initPath(pathSet){
        pathSet.map(path => {
            path.updateLength();
            path.updateInfo();
        })
    }

    // 塗りと抜きを含めたパスのセットを作成
    static createFillPathSet(pathSet){
		var fillPathSet = [];
		var tmp = [];
        var prevFill = false;
        for(var idx in pathSet){
            //新しいパスの始まり
            if(!prevFill == pathSet[idx].isFill()){
                if(fillPathSet.length != 0){
                    fillPathSet.push(tmp.slice());
                    tmp = [];
                }
            }
            tmp.push(pathSet[idx]);
            prevFill = pathSet[idx].isFill();
        }  
        
		fillPathSet.push(tmp.slice());
		return fillPathSet
    }

}

export default PathUtil;