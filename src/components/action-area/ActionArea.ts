import * as Styles from 'common/Styles';
import { replaceContent } from 'common/util';
import { AbstractWidget, Renderable } from '@quenk/wml/lib/runtime';
import { Main } from './wml/action_area';

/**
 * ActionArea
 */
export class ActionArea extends AbstractWidget {

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
