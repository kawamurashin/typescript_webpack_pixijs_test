import * as PIXI from 'pixi.js'

export default class XmlImageData {
    get path(): string {
        return this._path;
    }
    get texture() {
        return this._texture;
    }
    private _path: string;
    private _texture: PIXI.Texture;
    constructor() {

    }

    setNode(node) {
        this._path = node.textContent;
        //console.log("this._path " + this._path)
    }

    setTexture(texture) {
        this._texture = texture;
    }
}
