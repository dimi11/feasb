/**
 * This is functional interface that should be used for setting event handler for UiComponent.
 */
export interface UiComponentEventHandler{
    (eventName: string, object?: any):void;
}
