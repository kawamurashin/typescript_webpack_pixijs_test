import * as PIXI from 'pixi.js'
import {RippleObject} from "./obj/RippleObject";
export class RippleManager extends PIXI.Container{

    private _rippleList:RippleObject[];
    constructor() {
        super();

        const click3 = () =>
        {
            console.log("click " + Math.random())
        }
        /*
        app.stage.interactive = true
        app.stage.on("click" , click3);

         */

        this._rippleList = [];

        this.interactive = true
        this.on("click" , click3);
    }
    public enterFrame():void
    {

    }

    public add(postion:PIXI.Point):void
    {
        const handler =(r:RippleObject) =>
        {
            this.rippleComplete(r);
        }
        let ripple = new RippleObject();
        this.addChild(ripple);
        ripple.x = postion.x;
        ripple.y = postion.y;
        ripple.on("ripple_complete", handler);


        this._rippleList.push(ripple);


    }
    private rippleComplete(ripple:RippleObject):void
    {
        console.log("rippleComplete " + Math.random())
        let n:number = this._rippleList.length;
        for(let i:number = 0;i<n;i++)
        {
            let r:RippleObject = this._rippleList[i]
            if(r == ripple)
            {
                this._rippleList.splice(i,1)
                this.removeChild(ripple)
                return;
            }

        }

    }
}