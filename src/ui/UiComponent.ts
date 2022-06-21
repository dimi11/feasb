import {UiComponentEventHandler} from './UiComponentEventHandler';

export abstract class UiComponent{
    private _decoratorUids: Array<string> = [];

    public template: DocumentFragment;
    protected uiComponentEventHandler: UiComponentEventHandler;

    constructor(){
        this.template = document.createRange().createContextualFragment(this.render());
        this._decoratorInitElementsWithUids();
    }

    protected abstract render():string;

    public inject(container: HTMLElement, skipCleaningContainer = false):Node{
        if (!skipCleaningContainer) container.innerHTML = "";
        let n = container.appendChild(this.template.firstChild);
        this.start();
        return n;
    }

    protected start():void{};

    protected findUiElement <T extends HTMLElement>(uid:string):T{
        return this.template.querySelector(`[data-uid="${uid}"]`);
    }


    public addUiComponentEventHandler(uiComponentEventHandler: UiComponentEventHandler):void{
        this.uiComponentEventHandler = uiComponentEventHandler;
    }

    public removeUiComponentEventHandler():void{
        this.uiComponentEventHandler = null;
    }


    private _decoratorEmitUid(uid: string):void{
        if (!this._decoratorUids) this._decoratorUids = [];        
        this._decoratorUids.push(uid);
    }

    private _decoratorInitElementsWithUids():void{
        ((this as any)._decoratorUidsReady as Array<string>)?.forEach(uid => {
            (this as any)[uid];
            this._decoratorBindEvents(((this as any)[uid] as HTMLElement));
        });
    }

    private _decoratorBindEvents(el: HTMLElement):void{
        let eventAttribPrefix = "data-event-on-";
        for (let i = 0; i < el.attributes.length; i++){
            if (el.attributes.item(i).nodeName.indexOf(eventAttribPrefix) === 0){
                let eventName = el.attributes.item(i).nodeName.substring(eventAttribPrefix.length);
                el.addEventListener(eventName, (e)=> {(this as any)[el.attributes.item(i).value](e);});
            }
        }
    }
}
