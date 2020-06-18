import * as PIXI from 'pixi.js'
import XmlImageData from "./data/XmlImageData";
export default class ModelManager extends PIXI.utils.EventEmitter {
    get xmlImageDataList(): XmlImageData[] {
        return this._xmlImageDataList;
    }

    private static _instance: ModelManager;
    private _path: string = "data/data.xml";
    private _xmlImageDataList:XmlImageData[];
    private _count:number = 0;

    public static getInstance(): ModelManager {
        if (this._instance == null) {
            this._instance = new ModelManager(new SingletonBlock());
        }
        return this._instance;
    }

    constructor(block: SingletonBlock) {
        super();
        block = null;
    };

    public start(): void {
        const handler = (documentElement) => {
            this.xmlComplete(documentElement);
        }
        let loader = new XMLHttpRequest();
        loader.onreadystatechange = function () {
            if (loader.readyState == 4) {
                if (loader.status == 200) {

                    handler(this.responseXML.documentElement)
                    //this._xmlComplete(loader.responseXML.documentElement)
                } else {
                    console.log("status error");
                }
            }
        }
        loader.open("GET", this._path);
        loader.send();
    }


    private xmlComplete(documentElement): void {
        /**/
        this._xmlImageDataList = [];
        let nodes = documentElement.getElementsByTagName("image");
        let n = nodes.length;
        for (let i = 0; i < n; i++) {
            let node = nodes[i];
            let xmlImageData:XmlImageData = new XmlImageData();
            xmlImageData.setNode(node);
            this._xmlImageDataList[i] = (xmlImageData);
        }
       // this.startComplete();
        this.initImageLoad();
    }

    private initImageLoad() {
        this._count = 0;
        this.imageLoad();
    }

    private imageLoad() {
        let loader = new PIXI.Loader();
        const complete = () => {
            this.imageLoadCompleteHandler(loader);
        }
        let xmlImageData = this._xmlImageDataList[this._count];
        loader.add(this._count.toString(), xmlImageData.path);
        loader.onComplete.add(complete);
        loader.load();
    }
    private imageLoadCompleteHandler(loader:PIXI.Loader):void
    {
        let xmlImageData = this._xmlImageDataList[this._count];
        let texture = loader.resources[this._count.toString()].texture;
        xmlImageData.setTexture(texture);

        this._count++;
        if (this._count >= this._xmlImageDataList.length) {
            this.imageLoadAllComplete()
        } else {
            this.imageLoad();
        }
    }
    private imageLoadAllComplete()
    {
        this.startComplete();
    }
    private startComplete():void
    {
        this.emit("complete");
    }
}

class SingletonBlock {

}
