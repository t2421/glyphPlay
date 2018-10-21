
class MathUtil {

    constructor() {

    }
    static abs(num){
        return num>0?num:-num;
    }
    static normalize(num){
    	return num/MathUtil.abs(num);
    }
    static randomDirection(){
        return (MathUtil.randomInt(1) - 0.5) * 2;
    }
    static randomInt(a,b=1){
        return Math.floor(Math.random() * (a + 1)) * b;
    }
}

export default MathUtil
