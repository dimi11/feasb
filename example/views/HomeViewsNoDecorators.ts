import { UiComponent } from "../../src/ui/UiComponent";


export class HomeViewsNoDecorators extends UiComponent{
    protected spanNumberOfCliks: HTMLSpanElement;
    protected btnInc: HTMLButtonElement;

    protected count = 0;

    constructor(){
        super();

        this.spanNumberOfCliks = this.findUiElement("spanNumberOfCliks");
        this.btnInc = this.findUiElement("btnInc");
        this.btnInc.onclick = (e) => {
            this.btnIncClicked(e);
        }
    }

    protected render(): string {
        return /*html*/`<div>
                            Number of cliks: <span data-uid="spanNumberOfCliks">0</span>
                            <button data-uid="btnInc">Inc</button>

                            <div><b>Note:</b> this implemenatation does not use decorators</div>
                        </div>`;
    }

    protected btnIncClicked(e?: Event){
        this.spanNumberOfCliks.innerText = `${++this.count}`;
    }
}