import { UiBinder } from '../decorators/UiBinderDecorator';
import { UiElement } from '../decorators/UiElementDecorator';
import {UiComponent} from '../ui/UiComponent';

@UiBinder
export class HomeView extends UiComponent{
    @UiElement()
    protected btnTest: HTMLButtonElement;
    @UiElement()
    protected spanCount: HTMLSpanElement;

    private count = 0;

    protected render(): string {
        return /*html*/`<div>
            <h1>Home</h1>
            <p>Number of clicks: <span data-uid="spanCount"></span></p>
            <button data-uid="btnTest" data-event-on-click="btnTestClicked">Test click</button>
        </div>`;
    }

    protected btnTestClicked(e?: Event){
        this.spanCount.innerHTML = `${++this.count}`;
    }
}