import * as wml from '@quenk/wml';
import * as names from '@package/self/common/names';
import { Group, GroupAttrs } from '@package/self/content/Group';
import { Main } from './wml/aside';

export interface AsideAttrs extends GroupAttrs { }

/**
 * Aside provides a widget for displaying navigation and other sidebar content.
 *
 * It's api allows for toggling between hidden and shown states as well as querying the
 * current state. 
 *
 * This widget's style intentionally gives it a high z-index so that it appears in-front
 * of other content. Adjust the respective style variables to change.
 */
export class Aside extends Group<AsideAttrs>{

    /**
     * values is a hash of values used in the template
     */
    values = {

        id: {
            root: 'aside',
        },
        class: {
            root: names.ASIDE,
            content: names.ASIDE_CONTENT
        },
        attrs: {

            content: 'ww:content'

        },
        content: <wml.Renderable>(this.attrs.ww && this.attrs.ww.content) ? this.attrs.ww.content : null


    };

    view: wml.View = new Main(this);

    _getDrawerDOM<R>(f: (e: Element) => R): R | null {

        return this.view.findById<Element>(this.values.id.root).cata(() => null, f);

    }

    /**
     * visible queries whether the Drawer is visible or not.
     */
    visible(): boolean {

        return !this._getDrawerDOM(e => e.classList.contains(names.HIDDEN));

    }

    /**
     * hide the drawer.
     */
    hide(): void {

        if (this.visible())
            this._getDrawerDOM(e => e.classList.add(names.HIDDEN));

    }

    /**
     * showDrawer shows the drawer
     */
    show(): void {

        if (!this.visible())
            this._getDrawerDOM(e => e.classList.remove(names.HIDDEN));

    }

    /**
     * toggle the visibility of this Drawer
     */
    toggle(): void {

        this._getDrawerDOM(e => e.classList.toggle(names.HIDDEN));

    }

}

