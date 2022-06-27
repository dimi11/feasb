import { UiComponent } from "../../src/ui/UiComponent";

export class ChildView extends UiComponent{
    protected render(): string {
        return /*hmtl*/`<div>
                            I am child.
                        </div>`;
    }

}