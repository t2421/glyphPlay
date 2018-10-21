import IPathSegment from './IPathSegment';
import Vector2D from '../geom/Vector2D';
import Rectangle from '../geom/Rectangle';

class LineSegment extends IPathSegment {

    constructor(startPoint,points) {
        super();
        this.startPoint = startPoint.clone();
        this.points = points.slice();
        this.updateLength();
        this.rectangle = this.getRectangle();
        
    }
    getBounds(){
        return this.rectangle;
    }
    getPointAt(t){
        var x = this.startPoint.x + (this.points[0].x - this.startPoint.x) * t;
        var y = this.startPoint.y + (this.points[0].y - this.startPoint.y) * t;
        return new Vector2D(x, y);
    }
    updateLength(){
        this.length = Vector2D.distance(this.points[0],this.startPoint);
    }
    getLength(){
        return this.length;
    }
    draw(ctx){
        super.draw(ctx);
        // ctx.moveTo(this.startPoint[0],this.startPoint[1])
        ctx.lineTo(this.points[0].x,this.points[0].y)
      
    }
    
    drawRandom(){}
    split(t){
        if (t > 1 || t < 0)
        {
            throw new Error("0 <= t <= 1 の範囲内でtを設定して。分割するってどういうことかわかってるの？");
        }
        var t = 1 - t;
        
        var p01 = Vector2D.interpolate(this.startPoint, this.points[0], t);
        
        return [new LineSegment(this.startPoint, [p01]), new LineSegment(p01, [this.points[0]])];
    }
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
    getRectangle()
    {
        var p0 = this.startPoint;
        var p1 = this.points[0];

        var left = 99999;
        var right = -99999;
        var top = 99999;
        var bottom = -99999;
        var allPoints = [];
        allPoints[0] = p0;
        allPoints[1] = p1;
        for (var i = 0; i < 2; i++)
        {
            left = Math.min(left, allPoints[i].x);
            right = Math.max(right, allPoints[i].x);
            top = Math.min(top, allPoints[i].y);
            bottom = Math.max(bottom, allPoints[i].y);
        }
        
        return new Rectangle(left, top, right - left, bottom - top);
    }
    
    clone(){}
}
export default LineSegment
