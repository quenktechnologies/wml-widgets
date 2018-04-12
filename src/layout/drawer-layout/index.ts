import { View, WMLElement, Content, Component } from '@quenk/wml';
import { Hidable } from '../../content/state/hidden';
import { WidgetAttrs } from '../../';
import { Main  } from './wml/drawer-layout';
import { Drawer } from '../drawer';
import { LayoutAttrs, Layout } from '../';

///classNames:begin

/**
 * DRAWER_LAYOUT
 */
export const DRAWER_LAYOUT = 'ww-drawer-layout';

///classNames:end

const drawer = (l: DrawerLayout) => (f: (d: Drawer) => Drawer) =>
    l
        .view
        .findById(l.values.drawer.id)
        .map((e: WMLElement) => <Drawer>e)
        .map(f)
        .map(() => l)
        .orJust(() => l)
        .get();

export interface DrawerLayoutAttrs extends LayoutAttrs {

    /*
     * drawer is a view that will be used to populate the drawer 
     * part of the layout.
     */
    drawer?: View

};

/**
 * DrawerLayout provides a 1 column application layout with a drawer that can 
 * be shown or hidden upon requests.
 *
 * The drawer takes up most of the screen on mobile and about roughly 1/6 - 1/8 on
 * a desktop (not fact checked yet).
 *  
 *  Mobile:
 *  +------------------------------------------------------------------------------+
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |   <drawer>                                 |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  +------------------------------------------------------------------------------+
 *
 *  Desktop: 
 *  +------------------------------------------------------------------------------+
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |   <drawer>  |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  +------------------------------------------------------------------------------+
 *
 */
export class DrawerLayout
    extends Component<WidgetAttrs<DrawerLayoutAttrs>>
    implements Hidable, Layout {

    view: View = new Main(this);

    isHidden = () =>
        this
            .view
            .findById(this.values.drawer.id)
            .map((d: Drawer) => d.isHidden())
            .orJust(() => false)
            .get();

    hide = () => drawer(this)(d => d.hide());

    show = () => drawer(this)(d => d.show());

    toggle = () => drawer(this)(d => d.toggle());

    setContent: (c: Content) => DrawerLayout = (c: Content) => {

        this.values.content.render = () => [c]
        return this;

    }

    removeContent: () => DrawerLayout = () => {

        this.values.content.render = ()=>[]
        return this;

    }

    /**
     * values is a hash of values used in the template.
     */
    values = {

        root: {

            class: DRAWER_LAYOUT,

        },
        drawer: {

            id: 'drawer',

            content: (this.attrs.ww && this.attrs.ww.drawer) ? this.attrs.ww.drawer : null

        },
        content: {

            id: 'content',

            render: () => this.children

        }

    }

}
