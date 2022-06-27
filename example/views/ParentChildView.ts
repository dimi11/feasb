import { UiBinder } from "../../src/decorators/UiBinderDecorator";
import { UiElement } from "../../src/decorators/UiElementDecorator";
import { UiComponent } from "../../src/ui/UiComponent";
import { ChildView } from "./ChildView";

@UiBinder
export class ParentChildView extends UiComponent{
    @UiElement() protected divContainer:HTMLDivElement;

    protected render(): string {
        return /*html*/`<div>
            <h2>I am parent</h2>
            <div>
                <small>Bellow is container for children views</small>
                <div data-uid="divContainer"></div>
            <div>
        </div>`;
    }

    constructor(){
        super();
        new ChildView().inject(this.divContainer);
    }
    
}