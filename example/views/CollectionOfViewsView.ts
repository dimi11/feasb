import { UiBinder } from "../../src/decorators/UiBinderDecorator";
import { UiElement } from "../../src/decorators/UiElementDecorator";
import { UiComponent } from "../../src/ui/UiComponent";
import { ChildView } from "./ChildView";

@UiBinder
export class CollectionOfViewsView extends UiComponent{
    @UiElement() protected divContainer:HTMLDivElement;
    @UiElement() protected btnAdd: HTMLButtonElement;

    protected render(): string {
        return /*html*/`<div>
            <h2>I am parent</h2>
            <div>
                <small>Bellow is container for children views</small>
                <button data-uid="btnAdd" data-event-on-click="btnAddClicked">+ Add child view</button>

                <div data-uid="divContainer"></div>
            <div>
        </div>`;
    }

    protected btnAddClicked(e?:Event){
        new ChildView().inject(this.divContainer, true);
    }

}