
class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.originX = x;
        this.originY = y;
    }

    static interpolate(p1, p2, t) {
        var point = new Vector2D(t * p1.x + (1 - t) * p2.x, t * p1.y + (1 - t) * p2.y);
        return point;
    }

    static distance(p1,p2){
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;

        return Math.sqrt(dx*dx+dy*dy);
    }

    static direction(p1,p2){
        var dist = Vector2D.distance(p1,p2);
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        return new Vector2D(dx/dist,dy/dist);
    }

    clone() {
        return new Vector2D(this.x, this.y);
    }

}

export default Vector2D;