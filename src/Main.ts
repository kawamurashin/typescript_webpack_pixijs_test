import * as PIXI from 'pixi.js'
import ControllerManager from "./controller/ControllerManager";
import * as Stats from '../script/Stats.js'

let app:PIXI.Application;
const CANVAS_WIDTH:number = 1920;
const CANVAS_HEIGHT:number = 1080;

class Main {

    private readonly _controllerManager: ControllerManager;
    private readonly _stats: Stats;

    constructor() {
        const handler = () => {
            this.enterFrame();
        }
        const resize = () =>
        {
            this.canvas_resize();
        }
        app = new PIXI.Application({
            width: 1920,
            height: 1080,
            transparent: true,
            antialias:true,

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
        this._stats.domElement.style.right = "100px";
        this._stats.domElement.style.top = "5px";
        document.body.appendChild(this._stats.domElement);


        resize();
        window.addEventListener('resize', resize, false);
    }

    enterFrame() {
        this._controllerManager.enterFrame();
        // this._sprite.x = 10 - 20*Math.random();
        this._stats.update();
    }


    //from io.socket end;
    private canvas_resize(): void {

        let width: number;
        let height: number;
        if (CANVAS_WIDTH / CANVAS_HEIGHT >= window.innerWidth / window.innerHeight) {
            width = window.innerWidth;
            height = width * (CANVAS_HEIGHT / CANVAS_WIDTH);
        } else {
            height = window.innerHeight;
            width = height * (CANVAS_WIDTH / CANVAS_HEIGHT);
        }

        let innerWidth: number = window.innerWidth;
        let innerHeight: number = window.innerHeight;

        app.renderer.resize(window.innerWidth, window.innerHeight);
        //app.stage.setAttribute('width', String(window.innerWidth));
        //app.stage.setAttribute('height', String(window.innerHeight));
        //canvasGL.setAttribute('width', String(innerWidth));
        //canvasGL.setAttribute('height', String(innerHeight));

        let x: number = (window.innerWidth - width) * -0.5;
        let y: number = (window.innerHeight - height) * 0.5;

        //canvasGL.style.left =  x + "px";
        //canvasGL.style.top =  y + "px";


        this._controllerManager.resize(width, height);


    }
}



window.addEventListener("load", () => {
    new Main();
});