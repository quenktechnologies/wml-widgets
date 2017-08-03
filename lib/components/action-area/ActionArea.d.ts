import { Component, Renderable, Attrs } from '@quenk/wml-runtime';
import { Main } from './wml/action_area';
export interface ActionAreaAttrs extends Attrs {
}
/**
 * ActionArea
 */
export declare class ActionArea extends Component<ActionAreaAttrs> {
    view: Main<this>;
    /**
     * setContent replaces the content of this view.
     */
    setContent(r: Renderable): ActionArea;
}
export default ActionArea;
