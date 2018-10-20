import Rectangle from '../geom/Rectangle';

class Path {
    constructor() {
        this.segments = [];
        
    }
    add(segment){
        this.segments.push(segment)
    }
    updateInfo(){
        this.rectangle = this.getRectangle();
    }
    draw(ctx){
        let len = this.segments.length;
       
        for(let i = 0;i<len;i++){
            this.segments[i].draw(ctx);   
        }   
    }
    drawDebug(ctx){
        this.segments.forEach(seg => {
            seg.drawDebugInfo(ctx);
        });
    }
    getRectangle(){
        var minX = 99999;
        var minY = 99999;
        var maxX = -99999;
        var maxY = -99999;
        this.segments.map(segment => {
            var rect = segment.getBounds();
            if(rect){
                minX = Math.min(minX,rect.left);
                maxX = Math.max(maxX,rect.right);
                minY = Math.min(minY,rect.top);
                maxY = Math.max(maxY,rect.bottom);
            }
        });
        return new Rectangle(minX,minY,maxX-minX,maxY-minY);
    }
    getPointAt(t){
        var totalLength = this.getLength();
        var length = totalLength*t;
        var lengthCount = 0;
        var i = 0;
      
        while(length > lengthCount){
            lengthCount += this.segments[i].getLength();
            i++;
        }
        var overLength = lengthCount-length;
        var targetIndex = i - 1;
        if(targetIndex<0){
            targetIndex=0;
        }
        var targetSegment = this.segments[targetIndex];
        var targetLength = targetSegment.getLength();
        var targetRatio = (targetLength-overLength)/targetLength;
        var point = targetSegment.getPointAt(targetRatio);
        return point;
    }
    updateLength(){
        var len = 0;
        for(var i =0; i<this.segments.length;i++){
            len += this.segments[i].getLength();
        }
        this.length = len;
    }
    getLength(){
        return this.length;
    }

    isFill(){
        var S	= 0;
        let len = this.segments.length;
        for(let i = 0;i<len;i++){
            var next = i+1;
            if(i == len-1){
                next = 0;
            }
            var p1 = this.segments[next].getEndPoint();
            var p0 = this.segments[i].getEndPoint();
            S += p0.x * p1.y - p1.x * p0.y;            
        }
        return S<0;
    }
}
export default Path
