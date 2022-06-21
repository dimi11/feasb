export function UiElement() {
    return function(target: any, propName: string){
        Object.defineProperty(target, propName, {
            get(this: any){
                const propertyName = `__${String(propName)}`;
                if (!this[propertyName]){
                    this[propertyName] = this.findUiElement(propName);
                }
                return this[propertyName];
            },
            enumerable: true,
            configurable: true
        });
        target._decoratorEmitUid(propName);
    }
}