import Glyph from "../glyph/Glyph";
import GlyphData from "../data/GlyphData";


class Main{
    constructor(){
        this.canvas = $('#canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        
        this.glyph;
    }

    start(){
        var glyphData = new GlyphData();
        glyphData.load((data)=>{
            this.init(data);
        })
    }

    init(data){
        const ctx = this.ctx;
     
        var g = new Glyph(data)
        g.init();
        
        // g.initRandom(20)
        g.setOpacity(0.5);
        g.strokeStyle = "#ffffff"
        g.draw(ctx);
        this.glyph = g;

        this.loop();

    }

    loop(){
        const ctx = this.ctx;
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        // this.glyph.setOpacity(Math.random());
        this.glyph.draw(ctx);
        this.glyph.drawDebug(ctx);
        requestAnimationFrame(this.loop.bind(this));
    }
}


export default Main;