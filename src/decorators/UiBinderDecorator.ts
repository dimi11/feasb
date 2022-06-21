export function UiBinder(constructor: Function){
    constructor.prototype._decoratorUidsReady = JSON.parse(JSON.stringify(constructor.prototype._decoratorUids));
}