import * as names from './classNames';
import * as util from '../../util';
import * as orientation from '../../content/orientation/classNames';
import { View } from '@quenk/wml';
import { Group, GroupAttrs } from '../../content/Group';
import { Main } from './wml/action-bar';

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
              names.ACTION_BAR,
              orientation.RIGHT_PUSHABLE,
              orientation.POSITIONED
            ]),
            content: names.ACTION_BAR_CONTENT

        }

    }

}
