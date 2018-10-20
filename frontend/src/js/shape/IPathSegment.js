
class IPathSegment {
    constructor() {
        this.points;
        this.startPoints;
    }
    getBounds(){}
    getPointAt(){}
    getLength(){}
    draw(ctx){
        
    }
    drawRandom(){}
    drawDebugInfo(ctx){

        if(this.rectangle){
            var rect = this.rectangle;
            ctx.beginPath();
            ctx.moveTo(rect.left,rect.top);
            ctx.lineTo(rect.right,rect.top);
            ctx.lineTo(rect.right,rect.bottom);
            ctx.lineTo(rect.left,rect.bottom);
            ctx.lineTo(rect.left,rect.top);
            ctx.closePath();
            ctx.stroke();
        }
        
    }
    getEndPoint(){
        return this.points[this.points.length-1];
    }
    translate(){}
    clone(){}
}
export default IPathSegment
