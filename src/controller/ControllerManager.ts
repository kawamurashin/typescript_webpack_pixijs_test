import * as PIXI from 'pixi.js'
import ModelManager from "../model/ModelManager";

export default class ControllerManager extends PIXI.Container {
    private readonly _sprite: PIXI.Sprite;

    constructor() {
        super();
        const handler = () => {
            this.modelStartComplete();
        }
        let texture = PIXI.Texture.from('image/image.jpg');
        this._sprite = new PIXI.Sprite(texture);
        this.addChild(this._sprite);
        this._sprite.anchor.x = 0.5;
        this._sprite.anchor.y = 0.5;

        this._sprite.x = 200;
        this._sprite.y = 200;

        let modelManager: ModelManager = ModelManager.getInstance();
        modelManager.on("complete", handler)
        modelManager.start();

    }


    enterFrame() {
        this._sprite.x = 1 - 2 * Math.random();
        this._sprite.y = 1 - 2 * Math.random();
    }

    private modelStartComplete():void
    {
        console.log("controller complete handler")
    }

}



