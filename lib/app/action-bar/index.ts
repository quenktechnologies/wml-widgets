import * as util from '../../util';
import * as orientation from '../../content/orientation';
import { View } from '@quenk/wml';
import { Group, GroupAttrs } from '../../content/Group';
import { Main } from './wml/action-bar';

///classNames:begin

/**
 * ACTION_BAR class name. for the ActionBar root.
 */
export const ACTION_BAR = 'ww-action-bar';

/**
 * ACTION_BAR_CONTENT class name. 
 */
export const ACTION_BAR_CONTENT = 'ww-action-bar__content';

///classNames:end

/**
 * ActionBarAttrs
 */
export interface ActionBarAttrs extends GroupAttrs { }

/**
 * ActionBar provides a bar across the screen that can be
 * used as a toolbar, navigation menu or something simillar.
 */
export class ActionBar extends Group<ActionBarAttrs> {

    view: View = new Main(this);

    values = {

        id: {

            content: 'content'

        },

        class: {

            root: util.combine([
                ACTION_BAR,
                orientation.RIGHT_PUSHABLE,
                orientation.POSITIONED
            ]),
            content: ACTION_BAR_CONTENT

        }

    }

}
