import { UiBinder } from "../../src/decorators/UiBinderDecorator";
import { UiElement } from "../../src/decorators/UiElementDecorator";
import { UiComponent } from "../../src/ui/UiComponent";

@UiBinder
export class HomeView extends UiComponent{
    @UiElement() protected spanNumberOfCliks: HTMLSpanElement;
    @UiElement() protected btnInc: HTMLButtonElement;

    protected count = 0;

    protected render(): string {
        return /*html*/`<div>
                            Number of cliks: <span data-uid="spanNumberOfCliks">0</span>
                            <button data-uid="btnInc" data-event-on-click="btnIncClicked">Inc</button>
                        </div>`;
    }

    protected btnIncClicked(e?: Event){
        this.spanNumberOfCliks.innerText = `${++this.count}`;
    }
}