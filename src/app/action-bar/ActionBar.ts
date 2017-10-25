import * as names from '@package/self/common/names';
import * as util from '@package/self/common/util';
import { Group, GroupAttrs } from '@package/self/content/Group';
import { Main } from './wml/action_bar';

export interface ActionBarAttrs extends GroupAttrs { }

/**
 * ActionBar provides a bar across the screen that can be
 * used as a toolbar, navigation menu or something simillar.
 */
export class ActionBar extends Group<ActionBarAttrs> {

    view = new Main(this);

    values = {

        id: {

            content: 'content'

        },

        class: {

            root: util.combine([names.ACTION_BAR, names.FIXED_PUSHABLE]),
            content: names.ACTION_BAR_CONTENT

        }

    }

}
