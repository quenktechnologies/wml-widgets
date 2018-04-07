import { View, WMLElement } from '@quenk/wml';
import { Group, GroupAttrs } from '../../content/Group';
import { Hidable } from '../../content/state/hidden';
import { Main } from './wml/drawer-layout';
import { Drawer } from '../drawer';

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

export interface DrawerLayoutAttrs extends GroupAttrs {

    ww?: {

        /*
         * drawer is a view that will be used to populate the drawer 
         * part of the layout.
         */
        drawer?: View

        /**
         * content can be used instead of speciying children.
         */
        content?: View

    }

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
export class DrawerLayout extends Group<DrawerLayoutAttrs> implements Hidable {

    view: View = new Main(this);

    isHidden = () =>
        this
            .view
            .findById(this.values.root.id)
            .map((d: WMLElement) => (<Drawer>d).isHidden())
            .orJust(() => false)
            .get();

    hide = () => drawer(this)(d => d.hide());

    show = () => drawer(this)(d => d.show());

    toggle = () => drawer(this)(d => d.toggle())

    /**
     * values is a hash of values used in the template.
     */
    values = {

        root: {

            id: 'content',

            class: DRAWER_LAYOUT,

        },
        drawer: {

            id: 'drawer',

            content: (this.attrs.ww && this.attrs.ww.drawer) ? this.attrs.ww.drawer : null

        },
        content: {

            render: () => (this.attrs.ww && this.attrs.ww.content) ?
                this.attrs.ww.content.render() : this.children

        }
    }

}
