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
    private _data:any
    constructor() {
        super();
        const handler = (e) => {
            this.mouseDownHandler(e);
        }
        this.interactive = true;
        this.buttonMode = true;
        this.on("mousedown", handler);
    }
    public enterFrame():void
    {
        if(this._isDrag)
        {
            //let app = PIXI.Application;
            //console.log("app " + app)
            //console.log(app.renderer.plugins.interaction.mouse.global.x)
            let position = this._data.getLocalPosition(this.parent);

            this.x = position.x - this._dx;
            this.y = position.y - this._dy;
        }
        this._preX = this.x;
        this._preY = this.y;
    }



    private mouseDownHandler(e): void {
        const handler = () => {
            this.mouseUpHandler()
            window.removeEventListener('mouseup', handler);
        }
        this.emit("mouse_down", this);

        this._data = e.data;
        let position = this._data.getLocalPosition(this);
        this._dx = position.x;
        this._dy = position.y;
        this._isDrag = true;
        this._mouseDownX = this.x;
        this._mouseDownY = this.y;
        window.addEventListener('mouseup', handler, false);
    }

    private mouseUpHandler(): void {
        this._isDrag = false;
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