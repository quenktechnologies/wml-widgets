import * as wml from '@quenk/wml';
import {
    Hidable,
    isHidden,
    hide,
    show,
    toggle
} from '../../content/state/hidden';
import { LayoutAttrs, AbstractLayout } from '../../layout';
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

            id: this.attrs.ww && this.attrs.ww.id,

            className: DRAWER,

            wml: {

                id: 'root'

            }

        },
        content: {

            wml: {

                id: 'content'

            },

            className: DRAWER_CONTENT,

            value: (this.attrs.ww && this.attrs.ww.content) ?
                this.attrs.ww.content : this.children

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