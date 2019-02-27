import * as util from '../../util';
import * as orientation from '../../content/orientation';
import { View } from '@quenk/wml';
import { LAYOUT, LayoutAttrs, AbstractLayout } from '../';
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
export interface ActionBarAttrs extends LayoutAttrs { }

/**
 * ActionBar provides a bar across the screen that can be
 * used as a toolbar, navigation menu or something simillar.
 */
export class ActionBar extends AbstractLayout<ActionBarAttrs> {

    view: View = new Main(this);

    values = {

        root: {

            wml: {

                id: 'root',

            },

            id: (this.attrs.ww && this.attrs.ww.id) ?
                this.attrs.ww.id : '',

            class: util.combine([
                ACTION_BAR,
                LAYOUT,
                orientation.POSITIONED
            ])

        },
        content: {

            wml: {

                id: 'content'

            },

            class: ACTION_BAR_CONTENT

        }

    }

}
