import * as PIXI from 'pixi.js'
export namespace model
{
    export class ModelManager extends PIXI.utils.EventEmitter{
        constructor() {
            super();
            const handler = () =>
            {
                console.log("hoge3")

                this.emit("complete")
            }
            setTimeout(handler,1000);

        }

    }
}