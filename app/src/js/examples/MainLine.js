import Glyph from "../glyph/Glyph";
import PathAnimation from "../animation/PathAnimation";
import Main from "./Main";


class MainLine extends Main{
    constructor(){
        super();
        this._pathAnimations = [];
        this._randomSeedX = 20;
        this._randomSeedY = 20;
        this._numGlyphs = 10;
        this._glyphs = [];
    }

    init(data){
        const ctx = this.ctx;
        for(var i = 0; i < this._numGlyphs;i++){
            var g = new Glyph(data)
            g.init();
            
            g.initRandom(70)
            g.setOpacity(0);
            g.strokeStyle = "#ffffff"
            g.draw(ctx);
            this._glyphs.push(g);
        }
        this.loop();
    }

    loop(){
        const ctx = this.ctx;
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        // this.glyph.setOpacity(Math.random());
        this._glyphs.map(glyph =>{
            glyph.draw(ctx);
        })
       
        requestAnimationFrame(this.loop.bind(this));
    }
}


export default MainLine;