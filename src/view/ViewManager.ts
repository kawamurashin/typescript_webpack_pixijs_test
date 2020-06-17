import * as PIXI from 'pixi.js'
export class ViewManager extends PIXI.Container{
    private readonly _sprite: PIXI.Sprite;
    constructor() {
        super();
        console.log("view manager start")

        let texture = PIXI.Texture.from('image/image.jpg');
        this._sprite = new PIXI.Sprite(texture);
        this.addChild(this._sprite);
        this._sprite.anchor.x = 0.5;
        this._sprite.anchor.y = 0.5;

        this._sprite.x = 400;
        this._sprite.y = 400;
    }
    public loadComplete():void
    {

    }
    public enterFrame()
    {
        this._sprite.x += 1 - 2 * Math.random();
        this._sprite.y += 1 - 2 * Math.random();
        if(this._sprite.x < 0)
        {
            this._sprite.x = 0
        }else if(this._sprite.x > 1920)
        {
            this._sprite.x = 1920;
        }

        if(this._sprite.y < 0)
        {
            this._sprite.y = 0;
        }
        else if(this._sprite.y > 1080)
        {
            this._sprite.y = 1080;
        }

    }


}