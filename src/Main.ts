///<reference path="controller/ControllerManager.ts"/>
import * as PIXI from 'pixi.js'
import * as Stats from '../script/Stats.js'
import {controller} from "./controller/ControllerManager";
import ControllerManager = controller.ControllerManager;

class Main {

    private readonly _controllerManager: ControllerManager;
    private readonly _stats: Stats;

    constructor() {
        const handler = () => {
            this.enterFrame();
        }
        let app = new PIXI.Application({
            width: 1920,
            height: 1080,
            backgroundColor: 0x1099bb,
        });
        let el = document.getElementById('app');
        el.appendChild(app.view);

        this._controllerManager = new ControllerManager();
        app.stage.addChild(this._controllerManager);

        const ticker = new PIXI.Ticker();
        ticker.add(handler);
        ticker.start();
        this._stats = new Stats();

        this._stats.domElement.style.position = "fixed";
        this._stats.domElement.style.right = "5px";
        this._stats.domElement.style.top = "5px";
        document.body.appendChild(this._stats.domElement);
    }

    enterFrame() {
        this._controllerManager.enterFrame();
        // this._sprite.x = 10 - 20*Math.random();
        this._stats.update();
    }
}

window.addEventListener("load", () => {
    new Main();
});