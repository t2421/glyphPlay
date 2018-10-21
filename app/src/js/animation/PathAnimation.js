import MathUtil from "../util/MathUtil";

class PathAnimation{
    constructor(path){
        this.velocity = 1;
        this.ratio = 0;
        this.path = path;
        this.ratioVelocity = this.speed / path.getLength();
        
    }

    setVelocity(velocity){
        this.velocity = velocity;
        this.ratioVelocity = this.velocity / this.path.getLength();
        this.ratioVelocity *= MathUtil.randomDirection();
    }

    updatePosition(){
        this.ratio += this.ratioVelocity;
        if(this.ratio > 1){
            this.ratio = 0;
        }
        if(this.ratio < 0){
            this.ratio = 1;
        }
        return this.path.getPointAt(this.ratio);
    }
}

export default PathAnimation;