import * as PIXI from 'pixi.js'
import ModelManager from "../model/ModelManager";
import {ViewManager} from "../view/ViewManager";

export default class ControllerManager extends PIXI.Container {


    private readonly _viewManager:ViewManager;

    constructor() {
        super();
        const handler = () => {
            ControllerManager.modelStartComplete();
        }


        let modelManager: ModelManager = ModelManager.getInstance();
        modelManager.on("complete", handler);


        this._viewManager = new ViewManager();
        this.addChild(this._viewManager);

        modelManager.start();

    }


    enterFrame() {
        /*
        this._sprite.x = 1 - 2 * Math.random();
        this._sprite.y = 1 - 2 * Math.random();*/
        this._viewManager.enterFrame();
    }

    private static modelStartComplete():void
    {
        console.log("controller complete handler")
    }

}



