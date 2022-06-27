import { UiBinder } from "../../src/decorators/UiBinderDecorator";
import { UiElement } from "../../src/decorators/UiElementDecorator";
import { UiComponent } from "../../src/ui/UiComponent";
import { RaisingEventView } from "./RaisingEventView";

@UiBinder
export class ProcessingEventView extends UiComponent{
    @UiElement() protected preLog: HTMLPreElement;
    @UiElement() protected divChildContainer: HTMLDivElement;

    protected rv:RaisingEventView;

    protected render(): string {
        return /*html*/`<div style="border: 1px solid blue;">
                            <h2>I am parent component</h2>
                            
                            <div data-uid="divChildContainer" style="border: 1px solid red; margin: 4px; padding: 4px;"></div>

                            <fieldset>
                                <legend>Events from child</legend>
                                <pre data-uid="preLog"></pre>
                            </fieldset>
                        </div>`;
    }

    constructor(){
        super();
        
        this.rv = new RaisingEventView();
        this.rv.addUiComponentEventHandler((eventName, value) => {
            this.preLog.innerText = `${this.preLog.innerText ?? ""}\n ${eventName} - ${value}`;
        });
        this.rv.inject(this.divChildContainer);
    }

}