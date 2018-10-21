class Rectangle{
    constructor(x=0,y=0,width=0,height=0){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.left = x;
        this.top = y;
        this.right = x + width;
        this.bottom = y + height;
    }
}

export default Rectangle;