import { UiBinder } from "../../src/decorators/UiBinderDecorator";
import { UiElement } from "../../src/decorators/UiElementDecorator";
import { UiComponent } from "../../src/ui/UiComponent";

@UiBinder
export class RaisingEventView extends UiComponent{
    @UiElement() protected btnChild: HTMLButtonElement;

    protected render(): string {
        return /*html*/`<div>
                            <div>I am child view</div>
                            <button data-uid="btnChild" data-event-on-click="btnChildClicked">Child button</button>
                        </div>`;
    }

    protected btnChildClicked(e?:Event){
        if (this.uiComponentEventHandler){
            this.uiComponentEventHandler("BUTTON-CHILD-CLICKED", new Date());
        }
    }

}