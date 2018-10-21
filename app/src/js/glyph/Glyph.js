import Rectangle from '../geom/Rectangle';
import PathUtil from '../shape/PathUtil';
import GlyphData from '../data/GlyphData';

class Glyph{

	constructor(fontInfo){
        this.fontInfo = fontInfo
        this.opacity = 1;
        
		this.fillStyle = `rgba(255,255,255,${this.opacity})`
		this.strokeStyle = "#ffffff"
		this.lineWidth = 0.5;
        this.glyph = [];
        this.allPath = [];
	}
	
	init(){
        var pathSet = PathUtil.createPathSet(this.fontInfo);
        this.allPath = pathSet.slice();
        PathUtil.initPath(pathSet);
        this.glyph = PathUtil.createFillPathSet(pathSet);
        this.updateInfo();
    }
    
    setOpacity(opacity){
        this.opacity = opacity;
        this.fillStyle = `rgba(255,255,255,${this.opacity})`
    }

    initRandom(seed=20){
        this.allPath.map(path => {
            path.addRandom(seed);
        });
       
    }

    getAllPath(){
        return this.allPath;
    }

    updateInfo(){
        this.rectangle = this.getRectangle();
    }
    getRectangle(){
        var minX = 99999;
        var minY = 99999;
        var maxX = -99999;
        var maxY = -99999;
        this.allPath.map(path => {
            var rect = path.getRectangle();
            if(rect){
                minX = Math.min(minX,rect.left);
                maxX = Math.max(maxX,rect.right);
                minY = Math.min(minY,rect.top);
                maxY = Math.max(maxY,rect.bottom);
            }
        });
        return new Rectangle(minX,minY,maxX-minX,maxY-minY);
    }
    drawDebug(ctx){
        var pathes = this.getAllPath();
        pathes.forEach(path => {
            path.drawDebug(ctx);
        });
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
	draw(ctx){
		ctx.fillStyle = this.fillStyle
		ctx.strokeStyle = this.strokeStyle
        ctx.lineWidth = this.lineWidth
		ctx.beginPath();
        for(var i = 0;i<this.glyph.length;i++){
            for(var j=0;j<this.glyph[i].length;j++){
                this.glyph[i][j].draw(ctx);   
            }
        }
        ctx.closePath();
        ctx.stroke()
        ctx.fill();
	}
}

export default Glyph