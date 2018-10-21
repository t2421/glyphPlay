import MathUtil from "../util/MathUtil";
import Vector2D from "../geom/Vector2D";

class PathAnimationForce{
    constructor(points){
        this.velocity = 1;
        this.ratio = 0;
        this.points = points;
        this.currentIndex = Math.floor(Math.random()*this.points.length);
        this.nextIndex = this.getNextIndex();
        this.position = this.points[this.currentIndex].clone();
        this.nextPosition = this.points[this.nextIndex];

        setInterval(()=>{
            this.currentIndex = this.nextIndex;
            this.nextIndex = this.getNextIndex();
            this.nextPosition = this.points[this.nextIndex];
        },300);
    }
    getNextIndex(){
        if(this.currentIndex+1 == this.points.length){
            return 0;
        }
        return this.currentIndex+1;
    }
    updatePosition(){
        var p0 = this.position;
        var p1 = this.nextPosition;
        var distance = Vector2D.distance(p0,p1);
        var direction = Vector2D.direction(p0,p1);
        p0.vx += direction.x/500*distance;
        p0.vy += direction.y/500*distance;
        p0.vx = Math.min(100,p0.vx)*0.95;
        p0.vy = Math.min(100,p0.vy)*0.95;
        

        p0.x += p0.vx;
        p0.y += p0.vy;
       
        return p0;
    }
   
}

export default PathAnimationForce;