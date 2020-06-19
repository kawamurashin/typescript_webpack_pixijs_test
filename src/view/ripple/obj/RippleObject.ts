import * as PIXI from 'pixi.js'

export class RippleObject extends PIXI.Container{

    constructor() {
        super();

        let g:PIXI.Graphics = new PIXI.Graphics();
        g.beginFill(0xFFFFFF);
        g.drawCircle(0,0,50);
        this.addChild(g);

        const handler = () =>
        {
            this.complete();
        }

        setTimeout(handler , 10000 * Math.random())
    }

    private complete():void
    {
        this.emit("ripple_complete" , this);
    }

}