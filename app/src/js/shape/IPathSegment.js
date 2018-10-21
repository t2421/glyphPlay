import Vector2D from '../geom/Vector2D';
class IPathSegment {
    constructor() {
        
    }
    getBounds(){}
    getPointAt(){}
    getLength(){}
    draw(ctx){
        
    }
    addRandom(seed){
        this.startPoint = new Vector2D(this.startPoint.x+Math.random()*seed - seed/2,this.startPoint.y+Math.random()*seed - seed/2);

        for(var i = 0;i<this.points.length;i++){
            var point = this.points[i];
            this.points[i] = new Vector2D(point.x +Math.random()*seed - seed/2,point.y +Math.random()*seed - seed/2);
        }
        
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
