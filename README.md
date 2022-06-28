# feasb - Front End As Should Be

[![](https://badgen.net/npm/v/feasb?icon=npm)](https://www.npmjs.com/package/feasb)
![](https://flat.badgen.net/github/license/dimi11/feasb)
![](https://flat.badgen.net/badge/icon/Typescript?color=green&icon=typescript&label)

**feasb** is acrinym for Front-End As Should Be.

It is ultra-small JS package (~7KB) developed in TypeScript that enables you writing and composing views (components) for your TypeScript front-end application.

If you are stucked and unhappy with ``action / dispacher / store / reducer / view`` and all other artifacts came from React / Flux / Redux world take a look on the code bellow.

```typescript
@UiBinder
export class HomeView extends UiComponent{
    @UiElement() protected spanNumberOfCliks: HTMLSpanElement;
    @UiElement() protected btnInc: HTMLButtonElement;

    protected count = 0;

    protected render(): string {
        return /*html*/`<div>
                            Number of clicks: <span data-uid="spanNumberOfCliks">0</span>
                            <button data-uid="btnInc" data-event-on-click="btnIncClicked">Inc</button>
                        </div>`;
    }

    protected btnIncClicked(e?: Event){
        this.spanNumberOfCliks.innerText = `${++this.count}`;
    }

}
```

As simple as that.

I belive that most of readers understands very easy what this code does but let's go step by step.

- It creates DIV element that holds one button and label "Number of clicks"
- If button is clicked `btnIncClicked()` method will increment counter and update this information

## Installation

To install this package use the following command with npm.

```
npm install --save feasb
```

## Making the view

View is a peace of UI that should be represented with `class` that should extend `UiComponent` class.

In order to start create a file named `HomeView.ts` and add the following code.

```typescript
import {UiComponent} from 'feasb/ui/UiComponent';

export class HomeView extends UiComponent{
    protected render(): string {
        return `<div>Hello world</div>`;
    }
}
```

*Congratulations!*
This is your first view.

`UiComponent` is `abstract` class that if inherited requires implementation of method `render()`. This method should return `string` representing html element that describes your view.

In order to put it on your host page create a file named `index.ts` and insert the code bellow.

```typescript
import { HomeView } from "HomeView";

window.onload = () => {
    new HomeView().inject(document.getElementById("app"));
}
```

To make it working your html host page should have an element with `id` attribute set to `app`. This element will be a container for the view you just created.

Example host page is bellow.

```html
<!doctype html>
<html>
    <head>
    <title>Sample app</title>
    </head>

    <body>
        <div id="app"></div>
    </body>
</html>
```

## Adding interaction

The example just show should only display *Hello world* message. There are no ui elements that user can interact to.

Instead of that let's create a view containg button and label that display number of clicks. Once clicked the number of clicks will be increased and shown on the label.

### Step 1 - Redefine render() method

```typescript
import {UiComponent} from 'feasb/ui/UiComponent';

export class HomeView extends UiComponent{
    protected render(): string {
        return `<div>
                    Number of clicks: <span>0</span>
                    <button>Inc</button>
                </div>`;
    }
}
```

### Step 2 - Identify UI elements that you want to access

If you have a need to access a certain element from your view you should add `data-uid` attribute. In our case we will work with `button` and `span`.

Let's give this elemnets `data-uid` values.

```typescript
import {UiComponent} from 'feasb/ui/UiComponent';
import {UiElement} from "feasb/decorators/UiElementDecorator";

export class HomeView extends UiComponent{
    @UiElement() protected spanNumberOfCliks: HTMLSpanElement;
    @UiElement() protected btnInc: HTMLButtonElement;

    protected render(): string {
        return `<div>
                    Number of clicks: <span data-uid="spanNumberOfCliks">0</span>
                    <button data-uid="btnInc">Inc</button>
                </div>`;
    }
}
```

Now whenever you need to work something with `button` that you specify in your view you can use `this.btnInc` in your code.
For example you can change the text of your button with the following code.

```typescript
this.btnInc.innerText = 'Click me';
```

You should spot annotation `@UiElement()` near property declaration.
If you do not want to use it the code would require to initilize each of elements in your constructor.

For example if you remove `@UiElement()` annotation at begining of `@UiElement() protected btnInc: HTMLButtonElement;` line you will need to add the following code in constructor in order to accees identfied elements.

```typescript
protected btnInc: HTMLButtonElement;

constructor(){
    super();
    this.btnInc = this.findUiElement("btnInc");
}
```
The code above is looking for element with attribute `data-uid` set to `btnInc` and creates an instance of `HTMLButtonElement` class which is exactly what annotation `@UiElement()` does automaticaly.


### Step 3 - handle events

If you need to handle any kind of events you should sett value for `data-on-{EVENT_NAME}` attribite. `{EVENT_NAME}` should be replaced with concrete event name. For instance for click **click** you need `data-on-click` event. For change `data-on-change` and so on.

Let's update our view.


```typescript
import {UiComponent} from 'feasb/ui/UiComponent';
import {UiElement} from "feasb/decorators/UiElementDecorator";
import {UiBinder} from "feasb/decorators/UiBinderDecorator";

@UiBinder
export class HomeView extends UiComponent{
    @UiElement() protected spanNumberOfCliks: HTMLSpanElement;
    @UiElement() protected btnInc: HTMLButtonElement;

    protected count = 0;

    protected render(): string {
        return /*html*/`<div>
                            Number of clicks: <span data-uid="spanNumberOfCliks">0</span>
                            <button data-uid="btnInc" data-event-on-click="btnIncClicked">Inc</button>
                        </div>`;
    }

    protected btnIncClicked(e?: Event){
        this.spanNumberOfCliks.innerText = `${++this.count}`;
    }

}
```

First we created a method `btnIncClicked(e?: Event)` that will handle button clicks.

Then you should spot that we added `data-event-on-click` attribute to our button and set the value as name of method that we want to delegate once event occure. In our case this value should be `btnIncClicked`.

The last step is `@UiBinder` anotation on above class declaration. This annotation will bind all events to methods as you scpecify in `data-on-{EVENT_NAME}` attribute.

If you want to avoid usage of `@UiBinder` you can always add event handler on the following way.

```typescript
constructor(){
    super();
    this.btnInc = this.findUiElement("btnInc");
    this.btnInc.onclick = (e) => {
        this.btnIncClicked(e);
    };
}
```

## Composing components

If you want to put component inside of your component you can do it easily by invoking the same `inject()` method with parameter of your element that will be a holder (container).

```typescript
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
```

The crucial part of code is the following.

```typescript
new ChildView().inject(this.divContainer);
```

It will inject instance of `ChildView` that extends UiComponent inside of element defined as `divContainer`. Note that `divContainer` is an element with value of `data-uid` attribute set to _"divContainer"_.

## Inject multiple components into the same container

So far we used `inject()` method to replace `innerHTML` content of given html element. If you like to append component instead add `true` as a secound argument.

```typescript
new ChildView().inject(document.getElemenetById("app"), true);
```

If you execute code above multiple times you will get the number of `ChildView` instances as much as number of times it is executed.

## Raising event from child copmponent

Child component can raise event which can be handled by parent component.
To do so parent component should add event handler by calling `addUiComponentEventHandler()` method as shown bellow.

```typescript
this.rv.addUiComponentEventHandler((eventName, value) => {
    //implement event           
});
```

Method `addUiComponentEventHandler()` expects functional interface with two arguments:

1. eventName - string explaining which event just occured
2. value - optional if event has to transfer some value when occurs

On the other side child component that raise event should call `addUiComponentEventHandler()` functional interface method with parameters `eventName` and optional `value`, Code bellow illustrated an example of such call.

```typescript
if (this.uiComponentEventHandler){
    this.uiComponentEventHandler("BUTTON-CHILD-CLICKED", new Date());
}
```

## Example code

Code of example above together with all other exmples is located in [repo](/example/).

Instruction on how to build example check [here](/docs/build-publish-info.md).