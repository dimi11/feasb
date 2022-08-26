import { UiBinder } from "../../src/decorators/UiBinderDecorator";
import { UiElement } from "../../src/decorators/UiElementDecorator";
import { UiComponent } from "../../src/ui/UiComponent";

@UiBinder
export class DifferentEventsView extends UiComponent{
    @UiElement() protected txtTest:HTMLInputElement;
    @UiElement() protected preLog:HTMLPreElement;
    @UiElement() protected btnTest:HTMLButtonElement;

    protected render(): string {
        return /*html*/`<div>
                            <input type="text"
                                    data-uid="txtTest" 
                                    data-event-on-focus="txtTextEventHappen"
                                    data-event-on-change="txtTextEventHappen"
                                    data-event-on-blur="txtTextEventHappen"
                                    data-event-on-keydown="txtTextEventHappen"
                            />
                            
                            <button data-uid="btnTest" data-event-on-click="txtTextEventHappen">Test</button>

                            <div>
                                <fieldset>
                                    <legend>Events:</legend>
                                    <pre data-uid="preLog"></pre>
                                </fieldset>
                            </div>
                        </div>`;
    }

    
    protected txtTextEventHappen(e:Event):void{
        let newLine = `EVENT [${(e.currentTarget as HTMLElement).getAttribute("data-uid")}.${e.type}] \t occured at ${new Date().toISOString()}`;
        this.preLog.innerText = `${this.preLog.innerText}\n${newLine}`;
    }

}