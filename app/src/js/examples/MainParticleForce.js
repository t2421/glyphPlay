import Glyph from "../glyph/Glyph";
import PathAnimationForce from "../animation/PathAnimationForce";
import Main from "./Main";


class MainParticleForce extends Main{
    constructor(){
        super();
        this._pathAnimations = [];
        this._randomSeedX = 20;
        this._randomSeedY = 20;
        this._points = [];
    }

    init(data){
        const ctx = this.ctx;
        var path; 

        var g = new Glyph(data)
        g.init();
        g.setOpacity(0.5);
        g.strokeStyle = "#ffffff"
        // g.draw(ctx);
        this.glyph = g;
        path = g.getAllPath();
        this.loop();
             
        path.map(element => {
            var pathLength = element.getLength();
            var numPoints = Math.ceil(pathLength/50);
            var ratioUnit = 1/numPoints;
            var tmpPoints = [];
            // var numAnim = 1;
            for(var j = 0;j<numPoints;j++){
                var point = element.getPointAt(ratioUnit*j);
                tmpPoints.push(point);
            }
            for(var j = 0;j<100;j++){
                this._pathAnimations.push(new PathAnimationForce(tmpPoints));
            }
            
            this._points.push(tmpPoints);
        })


        this._points.map(points=>{
            points.map(point=>{
                ctx.fillStyle = "rgba(255,255,255,0.3)";
                ctx.beginPath();
                ctx.arc(point.x,point.y,2,0,Math.PI*2);
                ctx.closePath();
                ctx.fill();
            })
        })

        
        
        this.loop();
        
        // $(window).on('mousemove',(e)=>{
        //     this._randomSeedX = e.pageX/20;
        //     this._randomSeedY = e.pageY/20;
        // })
    }

    loop(){
        const ctx = this.ctx;
        ctx.fillStyle = "rgba(0,0,0,0.03)";
        ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this._pathAnimations.map(animation=>{
            var pos = animation.updatePosition();
            ctx.fillStyle = "rgba(255,255,255,1)";
            ctx.beginPath();
            ctx.arc(pos.x,pos.y,2,0,Math.PI*2);
            ctx.closePath();
            ctx.fill();
        })
        requestAnimationFrame(this.loop.bind(this));
    }
}


export default MainParticleForce;