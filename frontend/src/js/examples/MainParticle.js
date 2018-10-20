import Glyph from "../glyph/Glyph";
import PathAnimation from "../animation/PathAnimation";
import Main from "./Main";


class MainParticle extends Main{
    constructor(){
        super();
        this._pathAnimations = [];
        this._randomSeedX = 20;
        this._randomSeedY = 20;
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
            // var numAnim = Math.floor(pathLength/10);
            var numAnim = Math.ceil(pathLength/200);
            // var numAnim = 1;
            for(var j = 0;j<numAnim;j++){
                var animation = new PathAnimation(element);
                animation.ratio = Math.random();
                animation.setVelocity(1);
                this._pathAnimations.push(
                    animation
                )
            }
        })
       
        this.loop();
        
        $(window).on('mousemove',(e)=>{
            this._randomSeedX = e.pageX/20;
            this._randomSeedY = e.pageY/20;
        })
    }

    loop(){
        const ctx = this.ctx;
        const randomSeedX = this._randomSeedX;
        const randomSeedY = this._randomSeedY;
        const pathAnimations = this._pathAnimations;

        // ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        for(var i=0;i<pathAnimations.length;i++){
            ctx.fillStyle = "rgba(255,255,255,0.1)";
            var pos = pathAnimations[i].updatePosition();
            ctx.beginPath();
            ctx.arc(pos.x+Math.random()*randomSeedX-randomSeedX/2,pos.y+Math.random()*randomSeedY-randomSeedY/2,2,0,Math.PI*2);
            ctx.closePath();
            ctx.fill();
        }
        // this.glyph.draw(ctx);
        requestAnimationFrame(this.loop.bind(this));
    }
}


export default MainParticle;