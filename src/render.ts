import { ICreateElement, IGeneral } from "./contracts/IElement";
import AbstractComponent from "./wrapper/AbstractComponent";
import { ComponentFragment } from "./wrapper/ComponentFragment";

let widget: ICreateElement;
let id = 0;

export function setCreateWidget($widget: ICreateElement) {
    widget = $widget;
}

export function getCreatedWidget() {
    return widget;
}

export function processor(jsx: IGeneral | IGeneral[]) {
    if (jsx instanceof AbstractComponent || jsx instanceof ComponentFragment) {
        if (typeof jsx.id !== 'number') {
            jsx.id = id++;
        }
        const render = jsx.render(widget);
        //console.log(jsx);
        return render;
    } else if (Array.isArray(jsx)) {
        return jsx.map(processor)
    } else if (typeof jsx === 'function') {
        return processor(jsx());
    }
    
    return jsx;
}


export default function render(jsx: IGeneral | IGeneral[]) {
    return processor(jsx);
}