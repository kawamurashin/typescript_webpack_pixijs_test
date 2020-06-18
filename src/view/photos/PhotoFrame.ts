import * as PIXI from 'pixi.js'
import XmlImageData from "../../model/data/XmlImageData";

export class PhotoFrame extends PIXI.Container {
    get isDrag(): boolean {
        return this._isDrag;
    }
    private _isDrag: boolean = false;
    private _mouseDownX:number;
    private _mouseDownY:number;
    private _preX:number;
    private _preY:number;

    private _dx:number;
    private _dy:number;



    constructor() {
        super();
        const handler = (e) => {
            this.mouseDownHandler(e);
        }
        this.interactive = true;
        this.on("mousedown", handler);
    }
    public enterFrame():void
    {
        if(this._isDrag)
        {
            let app = PIXI.Application;
            //console.log("app " + app)
            //console.log(app.renderer.plugins.interaction.mouse.global.x)

            let newPosition = this._data.getLocalPosition(this.parent);

            this.x = newPosition.x - this._dx;
            this.y = newPosition.y - this._dy;
        }
        this._preX = this.x;
        this._preY = this.y;
    }

    private _data

    private mouseDownHandler(e): void {
        const handler = () => {
            this.mouseUpHandler()
            window.removeEventListener('mouseup', handler);
        }
        console.log("mouseDownHandler")

        this._data = e.data;
        console.log("this._data :" + this._data);
        let newPosition = this._data.getLocalPosition(this);
        console.log("x " + newPosition.x)
        console.log("y " + newPosition.y)
        this._dx = newPosition.x;
        this._dy = newPosition.y;
        this._isDrag = true;
        this._mouseDownX = this.x;
        this._mouseDownY = this.y;
        window.addEventListener('mouseup', handler, false);
    }

    private mouseUpHandler(): void {
        this._isDrag = false;

        console.log("mouseUpHandler");

    }

    setXmlImageData(xmlImageData: XmlImageData) {

        let sprite: PIXI.Sprite;
        sprite = new PIXI.Sprite(xmlImageData.texture);
        const scale: number = 0.25;
        sprite.width = sprite.width * scale;
        sprite.height = sprite.height * scale;
        this.addChild(sprite);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;



    }
}