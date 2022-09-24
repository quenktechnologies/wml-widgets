import * as wml from '@quenk/wml';
import {
    HIDDEN,
    Hidable,
    isHidden,
    hide,
    show,
    toggle
} from '../../content/state/hidden';
import { LayoutAttrs, AbstractLayout } from '../../layout';
import { concat } from '../../util';
import { Main } from './wml/drawer';

///classNames:begin
export const DRAWER = 'ww-drawer';
export const DRAWER_CONTENT = 'ww-drawer__content';
///classNames:end

/**
 * DrawerAttrs
 */
export interface DrawerAttrs extends LayoutAttrs {

    /**
     * hidden if true, will hide the drawer.
     */
    hidden?: boolean,

    /**
     * content for the Drawer.
     *
     * Will be used if no children specified.
     */
    content?: wml.Content[]

}

/**
 * Drawer provides a widget for displaying navigation and other sidebar content.
 *
 * It's api allows for toggling between hidden and shown states as well as 
 * querying the current state. 
 *
 * This widget's style intentionally gives it a high z-index so that it appears
 * in-front  of other content. Adjust the respective style variables to change.
 */
export class Drawer extends AbstractLayout<DrawerAttrs> implements Hidable {

    view: wml.View = new Main(this);

    values = {

        root: {

            id: this.attrs && this.attrs.id,

            className: concat(DRAWER, (this.attrs && this.attrs.hidden) ?
                HIDDEN : ''),

            wml: {

                id: 'root'

            }

        },
        content: {

            wml: {

                id: 'content'

            },

            className: DRAWER_CONTENT,

            value: (this.attrs && this.attrs.content) ?
                this.attrs.content : this.children

        }

    };

    isHidden(): boolean {

        return isHidden(this.view, this.values.root.wml.id);

    }

    hide(): Drawer {

        hide(this.view, this.values.root.wml.id);
        return this;

    }

    show(): Drawer {

        show(this.view, this.values.root.wml.id);
        return this;

    }

    toggle(): Drawer {

        toggle(this.view, this.values.root.wml.id);
        return this;

    }

}
