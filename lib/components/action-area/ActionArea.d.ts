import { AbstractWidget, Renderable } from '@quenk/wml/lib/runtime';
import { Main } from './wml/action_area';
/**
 * ActionArea
 */
export declare class ActionArea extends AbstractWidget {
    view: Main;
    /**
     * setContent replaces the content of this view.
     */
    setContent(r: Renderable): ActionArea;
}
export default ActionArea;
