import IPathSegment from './IPathSegment';
import { Vector2D } from '../main';
import Rectangle from '../geom/Rectangle';

class CubicBezierSegment extends IPathSegment {

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
        var p = new Vector2D(0,0);
        var p0 = this.startPoint;
        var p1 = this.points[0];
        var p2 = this.points[1];
        var p3 = this.points[2];
        var a = 1 - t;
        var b = a * a;
        var c = t * t;
        var c0 = a * b;
        var c1 = 3 * b * t;
        var c2 = 3 * a * c;
        var c3 = t * c;
        p.x = p0.x * c0 + p1.x * c1 + p2.x * c2 + p3.x * c3;
        p.y = p0.y * c0 + p1.y * c1 + p2.y * c2 + p3.y * c3;
        return p;
    }
    updateLength(n=4){
        n = Math.pow(2, n);
        var p0 = this.getPointAt(0);
        var p1;
        var len = 0;
        for (var i = 1; i <= n; i++)
        {
            p1 = this.getPointAt(i / n);
            len += Vector2D.distance(p0, p1);
            p0.x = p1.x;
            p0.y = p1.y;
        }
        this.length = len;
    }
    getLength(){
        return this.length;
    }
    draw(ctx){
        super.draw(ctx);
        
        ctx.bezierCurveTo(this.points[0].x,this.points[0].y,this.points[1].x,this.points[1].y,this.points[2].x,this.points[2].y)
        
    }
    drawRandom(){}
    getRectangle(){
        var a, b, c, d;
			var t, p = new Vector2D();
			var v = [];
			var minX, maxX, minY, maxY;
			var p0 = this.startPoint;
            var p1 = this.points[0];
            var p2 = this.points[1];
            var p3 = this.points[2];

			var _p0 = new Vector2D(p0.x, p0.y);
			var _p1 = new Vector2D(p1.x, p1.y);
			var _p2 = new Vector2D(p2.x, p2.y);
			var _p3 = new Vector2D(p3.x, p3.y);
			v = [_p0.x, _p3.x];
			b = 6 * _p0.x - 12 * _p1.x + 6 * _p2.x;
			a = -3 * _p0.x + 9 * _p1.x - 9 * _p2.x + 3 * _p3.x;
			c = 3 * _p1.x - 3 * _p0.x;
			if (a == 0)
			{
				if (b != 0)
				{
					t = -c / b;
					if (0 < t && t < 1)
						v.push(this.getPointAt(t, p).x);
				}
			}
			else
			{
				d = b * b - 4 * c * a;
				if (d >= 0)
				{
					a *= 2;
					d = Math.sqrt(d);
					t = (-b + d) / a;
					if (0 < t && t < 1)
						v.push(this.getPointAt(t, p).x);
					t = (-b - d) / a;
					if (0 < t && t < 1)
						v.push(this.getPointAt(t, p).x);
				}
			}
			minX = Math.min.apply(null, v);
			maxX = Math.max.apply(null, v);
			
			v = [_p0.y, _p3.y];
			b = 6 * _p0.y - 12 * _p1.y + 6 * _p2.y;
			a = -3 * _p0.y + 9 * _p1.y - 9 * _p2.y + 3 * _p3.y;
			c = 3 * _p1.y - 3 * _p0.y;
			if (a == 0)
			{
				if (b != 0)
				{
					t = -c / b;
					if (0 < t && t < 1)
						v.push(this.getPointAt(t, p).y);
				}
			}
			else
			{
				d = b * b - 4 * c * a;
				if (d >= 0)
				{
					a *= 2;
					d = Math.sqrt(d);
					t = (-b + d) / a;
					if (0 < t && t < 1)
						v.push(this.getPointAt(t, p).y);
					t = (-b - d) / a;
					if (0 < t && t < 1)
						v.push(this.getPointAt(t, p).y);
				}
			}
			
			minY = Math.min.apply(null, v);
			maxY = Math.max.apply(null, v);
			
			return new Rectangle(minX, minY, Math.max(1e-5, maxX - minX), Math.max(1e-5, maxY - minY));
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
    clone(){}
}
export default CubicBezierSegment
