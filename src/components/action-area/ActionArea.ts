import * as Styles from 'wml-widgets-common/Styles';
import { replaceContent } from 'wml-widgets-common/util';
import { Component, Renderable, Attrs } from '@quenk/wml-runtime';
import { Main } from './wml/action_area';

export interface ActionAreaAttrs extends Attrs { }
/**
 * ActionArea
 */
export class ActionArea extends Component<ActionAreaAttrs> {

    view = new Main(this);

    /**
     * setContent replaces the content of this view.
     */
    setContent(r: Renderable): ActionArea {

        replaceContent(r, <Node>this.view.findById('content'));
        return this;

    }

}

export default ActionArea
