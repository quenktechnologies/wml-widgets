import { View, Content, Component } from '@quenk/wml';

import { contains, find } from '@quenk/noni/lib/data/array';

import { Drawer } from '../../menu/drawer';
import { concat, getById } from '../../util';
import { HTMLId } from '../../';
import { LAYOUT, LayoutAttrs, Layout } from '../';
import { DrawerLayoutView } from './view';

///classNames:begin
export const DRAWER_LAYOUT = 'ww-drawer-layout';
export const DRAWER_LAYOUT_CONTENT = 'ww-drawer-layout__content';
///classNames:end

/**
 * DrawerLayoutAttrs
 */
export interface DrawerLayoutAttrs extends LayoutAttrs {
    /**
     * drawer is the id of the root element of the drawer.
     *
     * This will be removed and added as the drawer is toggled.
     */
    drawer: HTMLId;

    /**
     * open if true shows the drawer along with the content.
     *
     * Defaults to false.
     */
    open?: boolean;

    /**
     * persist is a comma seperated list of html ids of elements in the content
     * are of the layout that should not be removed when setContent() is called.
     *
     * Use this to keep navigation bars etc.
     */
    persist?: string;

    /**
     * content if specified indicates which of the elements to treat as the
     * container for content.
     *
     * This element will be updated by calls to setContent() and removeContent()
     */
    content?: HTMLId;
}

/**
 * DrawerLayout provides a 2 column layout for an application where the first
 * column is an optionally displayed menu "drawer" and the second used for
 * regular application content.
 *
 * Methods exists to open or close the drawer as well as replace the content
 * displayed in the second column as desired.
 */
export class DrawerLayout
    extends Component<DrawerLayoutAttrs>
    implements Layout
{
    view: View = new DrawerLayoutView(this);

    values = {
        wml: { id: 'layout' },

        id: this.attrs.id,

        className: concat(DRAWER_LAYOUT, LAYOUT, this.attrs.className),

        content: {
            wml: { id: 'content' },

            className: concat(DRAWER_LAYOUT_CONTENT, LAYOUT),

            content: getContent(<Element[]>this.children, this.attrs.drawer),

            persist: (this.attrs.persist || '').split(',').filter(id => id)
        },

        drawer: {
            wml: { id: 'drawer' },

            hidden: !this.attrs.open,

            content: getDrawer(<Element[]>this.children, this.attrs.drawer)
        }
    };

    get _drawer() {
        return getById<Drawer>(this.view, this.values.drawer.wml.id).get();
    }

    get _content() {
        let content = getById<Element>(
            this.view,
            this.values.content.wml.id
        ).get();

        if (this.attrs.content)
            return <Element>content.querySelector(`#${this.attrs.content}`);
        else return content;
    }

    /**
     * isOpen indicates whether the drawer part of the layout is open.
     */
    isOpen(): boolean {
        return !this._drawer.isHidden();
    }

    /**
     * open the drawer part of the layout.
     */
    open() {
        this._drawer.show();
    }

    /**
     * close the drawer part of the layout.
     */
    close() {
        this._drawer.hide();
    }

    /**
     * toggle the state of the drawer part of the layout.
     */
    toggle() {
        if (this.isOpen()) this.close();
        else this.open();
    }

    setContent(frag: Content[]): DrawerLayout {
        this.removeContent();

        let content = this._content;

        frag.forEach(child => content.appendChild(child));

        return this;
    }

    removeContent(): DrawerLayout {
        let content = this._content;

        for (let i = 0; i < content.children.length; i++) {
            let child = content.children[i];

            if (!contains(this.values.content.persist, child.id))
                content.removeChild(child);
        }

        return this;
    }
}

const getDrawer = (children: Element[], id: HTMLId): Content[] =>
    find(children, (el: Element) => el.id === id)
        .map((el: Element) => [el])
        .orJust(() => [])
        .get();

const getContent = (children: Element[], id: HTMLId): Content[] =>
    children.filter(child => (<Element>child).id !== id);
