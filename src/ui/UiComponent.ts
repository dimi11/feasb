import {UiComponentEventHandler} from './UiComponentEventHandler';

export abstract class UiComponent{
    private _decoratorUids: Array<string> = [];

    public template: DocumentFragment;
    protected uiComponentEventHandler: UiComponentEventHandler;

    constructor(){
        this.template = document.createRange().createContextualFragment(this.render());
        this._decoratorInitElementsWithUids();
    }

    /**
     * This method must be implemented.
     * Return value represents html markup of component.
     * 
     * @example
     * protected render():string{
     *      return '<div><button data-uid="btnTest">Test</button></div>';
     * } 
     *
     * @returns string representing html markup of component 
     */
    protected abstract render():string;

    /**
     * Call this method do inject your component.
     * 
     * @param container - DOM element in which your component will be added.
     * @param skipCleaningContainer - if false container will be cleared first otherwise it will append.
     * @returns 
     */
    public inject(container: HTMLElement, skipCleaningContainer = false):Node{
        if (!skipCleaningContainer) container.innerHTML = "";
        let n = container.appendChild(this.template.firstChild);
        this.start();
        return n;
    }

    /**
     * Override this method if you want to do something with your component right after it is injected in DOM.
     */
    protected start():void{};

    /**
     * Use this method to get HTMLElement family object of your component based on data-uid attribute provided in render() method.
     * You can use @UiElement() annotation instead.
     * 
     * @example
     * let button:HTMLButton = this.findUiElement("btnTest");
     * 
     * @param uid - value of data-uid attribute based on which element will be instanced.
     * @returns Instance of HTMLElement or subclass object.
     */
    protected findUiElement <T extends HTMLElement>(uid:string):T{
        return this.template.querySelector(`[data-uid="${uid}"]`);
    }


    /**
     * Add event handler that your component can use to emmit events.
     * 
     * @param uiComponentEventHandler handler you are setting to be trigered.
     */
    public addUiComponentEventHandler(uiComponentEventHandler: UiComponentEventHandler):void{
        this.uiComponentEventHandler = uiComponentEventHandler;
    }

    /**
     * Removes component event handler.
     */
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
