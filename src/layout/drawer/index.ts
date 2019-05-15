import * as views from './wml/drawer';
import { View, Content, Component } from '@quenk/wml';
import { Maybe } from '@quenk/noni/lib/data/maybe';
import {
    hide,
    show,
    toggle
} from '../../content/state/hidden';
import { Hidable } from '../../content/state/hidden';
import { Drawer } from '../../menu/drawer';
import { concat, warnMissing } from '../../util';
import { WidgetAttrs } from '../../';
import { LAYOUT, LayoutAttrs, Layout } from '../';

///classNames:begin
/**
 * DRAWER_LAYOUT
 */
export const DRAWER_LAYOUT = 'ww-drawer-layout';
///classNames:end

/**
 * DrawerLayoutAttrs
 */
export interface DrawerLayoutAttrs extends LayoutAttrs {

    /**
     * drawerHidden if true will hide the Drawer.
     */
    drawerHidden?: boolean,

    /**
     * drawerContent used to populate the Drawer.
     */
    drawerContent?: Content[]

};

/**
 * DrawerLayout provides a 1 column application layout with a drawer that can 
 * be shown or hidden upon requests.
 *
 * The drawer takes up most of the screen on mobile and about roughly 1/6 - 1/8
 * on a desktop (not fact checked yet).
 *  
 *  Mobile:
 *  +---------------------------------------------------------------------+
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |   <drawer>                                 |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  +---------------------------------------------------------------------+
 *
 *  Desktop: 
 *  +---------------------------------------------------------------------+
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |   <drawer>  |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  +---------------------------------------------------------------------+
 */
export class DrawerLayout extends Component<WidgetAttrs<DrawerLayoutAttrs>>
    implements Hidable, Layout {

    view: View = new views.DrawerLayout(this);

    /**
     * values is a hash of values used in the template.
     */
    values = {

        root: {

            wml: {

                id: 'layout'

            },

            id: this.attrs.ww && this.attrs.ww.id,

            className: concat(DRAWER_LAYOUT, LAYOUT,
                (this.attrs.ww && this.attrs.ww.className) ?
                    this.attrs.ww.className : '')

        },
        drawer: {

            wml: {

                id: 'drawer'

            },

            hidden: (this.attrs.ww && this.attrs.ww.drawerHidden) ?
                this.attrs.ww.drawerHidden : false,

            content: (this.attrs.ww && this.attrs.ww.drawerContent) ?
                this.attrs.ww.drawerContent : []

        },
        content: {

            id: 'content',

            value: this.children

        }

    }

    isHidden(): boolean {

        let m = getDrawer(this);

        if (m.isNothing())
            return true;

        return m.get().isHidden();

    }

    hide(): DrawerLayout {

        let m = getDrawer(this);

        if (m.isJust()) {

            m.get().hide();
            hide(this.view, this.values.root.wml.id);

        }

        return this;

    }

    show(): DrawerLayout {

        let m = getDrawer(this);

        if (m.isJust()) {

            m.get().show();
            show(this.view, this.values.root.wml.id);


        }

        return this;

    }

    toggle() {

        let m = getDrawer(this);

        if (m.isJust()) {

            m.get().toggle();
            toggle(this.view, this.values.root.wml.id);

        }

        return this;

    }

    setContent(c: Content[]): DrawerLayout {

        this.values.content.value = c;
        this.view.invalidate();
        return this;

    }

    removeContent(): DrawerLayout {

        this.values.content.value = [];
        return this;

    }

}

const getDrawer = (dl: DrawerLayout) => {

    let m: Maybe<Drawer> = dl.view.findById(dl.values.drawer.wml.id);

    if (m.isNothing())
        warnMissing(dl.view, dl.values.drawer.wml.id);

    return m;

}
