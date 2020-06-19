import * as PIXI from 'pixi.js'
import XmlImageData from "../model/data/XmlImageData";
import ModelManager from "../model/ModelManager";
import {PhotoFrame} from "./photos/PhotoFrame";
import {RippleManager} from "./ripple/RippleManager";

export class ViewManager extends PIXI.Container {
    private readonly _sprite: PIXI.Sprite;
    private _line: PIXI.Graphics;
    private _container: PIXI.Container;
    private _photoFrameList: PhotoFrame[];

    constructor() {
        super();
        console.log("view manager start");

        this._photoFrameList = [];

        let background: PIXI.Sprite = new PIXI.Sprite();
        this.addChild(background);
        let graphics: PIXI.Graphics = new PIXI.Graphics();
        graphics.beginFill(0xFF0000);
        graphics.drawRect(0, 0, 1920, 1080);
        background.addChild(graphics);


        let texture = PIXI.Texture.from('image/image.jpg');
        this._sprite = new PIXI.Sprite(texture);
        this.addChild(this._sprite);
        this._sprite.anchor.x = 0.5;
        this._sprite.anchor.y = 0.5;

        this._sprite.x = 400;
        this._sprite.y = 400;


        this._container = new PIXI.Container();
        this.addChild(this._container);


        this._line = new PIXI.Graphics();
        this.addChild(this._line);




        let rippleManager = new RippleManager();
        this.addChild(rippleManager);
        const click = (e) =>
        {
            console.log("click " + Math.random())
            let position:PIXI.Point = e.data.getLocalPosition(this);

            rippleManager.add(position);
        }
        this.interactive = true
        this.on("click" , click);
    }

    public loadComplete(): void {
        const handler = (photoFrame: PhotoFrame) => {
            this._container.setChildIndex(photoFrame, this._container.children.length - 1);
            //this.setChildIndex(photoFrame,0);
        }
        const xmlImageDataList: XmlImageData[] = ModelManager.getInstance().xmlImageDataList;
        this._photoFrameList = [];
        let n: number = xmlImageDataList.length;

        let dx = 1920 / n
        let dy = 1080 / n


        for (let i: number = 0; i < n; i++) {
            let xmlImageData: XmlImageData = xmlImageDataList[i];
            let photoFrame: PhotoFrame = new PhotoFrame();
            this._container.addChild(photoFrame);
            photoFrame.setXmlImageData(xmlImageData);

            photoFrame.x = 250 + dx * i;
            photoFrame.y = 540 + 400 - 800 * Math.random();
            photoFrame.on("mouse_down", handler)

            this._photoFrameList.push(photoFrame);
        }
    }

    public enterFrame() {
        this._sprite.x += 1 - 2 * Math.random();
        this._sprite.y += 1 - 2 * Math.random();
        if (this._sprite.x < 0) {
            this._sprite.x = 0
        } else if (this._sprite.x > 1920) {
            this._sprite.x = 1920;
        }

        if (this._sprite.y < 0) {
            this._sprite.y = 0;
        } else if (this._sprite.y > 1080) {
            this._sprite.y = 1080;
        }


        let n: number;
        n = this._photoFrameList.length;
        for (let i: number = 0; i < n; i++) {
            let photoFrame: PhotoFrame = this._photoFrameList[i];
            photoFrame.enterFrame();
        }
        /*
        n  = this._photoFrameList.length;
        for(let i:number = 0;i<n;i++)
        {
            let photoFrame:PhotoFrame = this._photoFrameList[i];
            photoFrame.x += 1 - 2 * Math.random();
            photoFrame.y += 1 - 2 * Math.random();
            if(photoFrame.x < 0)
            {
                photoFrame.x = 0
            }else if(photoFrame.x > 1920)
            {
                photoFrame.x = 1920;
            }

            if(photoFrame.y < 0)
            {
                photoFrame.y = 0;
            }
            else if(photoFrame.y > 1080)
            {
                photoFrame.y = 1080;
            }

        }*/

        this._line.clear();
        this._line.lineStyle(1, 0xFF0000)

        let count: number = 0;
        n = this._photoFrameList.length;
        for (let i: number = 0; i < n; i++) {
            count = i;
            let current: PhotoFrame = this._photoFrameList[count];

            count = i + 1;
            if (i + 1 >= this._photoFrameList.length) {
                count = 0;
            }
            let next: PhotoFrame = this._photoFrameList[count];

            this._line.moveTo(current.x, current.y);
            this._line.lineTo(next.x, next.y);
        }
    }

    resize(width: number, height: number) {
        let scale: number = width / 1920;
        this.scale.x = scale;
        this.scale.y = scale;
        this.x = (window.innerWidth - width) * 0.5;
        this.y = (window.innerHeight - height) * 0.5;

    }
}