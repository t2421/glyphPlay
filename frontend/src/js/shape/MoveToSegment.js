import IPathSegment from './IPathSegment';

class MoveToSegment extends IPathSegment {

    constructor(startPoint,points) {
        super();
        this.startPoint = startPoint.clone();
        this.points = points.slice();
    }
    getBounds(){}
    getPointAt(t){
        return this.startPoint;
    }
    getLength(){return 0;}
    draw(ctx){
        super.draw(ctx);
        ctx.moveTo(this.points[0].x,this.points[0].y)
        
    }
    drawRandom(){}
    
    
    translate(dx,dy){
        var startPoint = this.startPoint;
        var points = this.points;

        for (var i = 0; i < startPoint.length; i += 2)
        {
            startPoint[i] += dx;
            startPoint[i + 1] += dy;
        }
        for (i = 0; i < points.length; i += 2)
        {
            points[i] += dx;
            points[i + 1] += dy;
        }
    }
    clone(){}
}
export default MoveToSegment
