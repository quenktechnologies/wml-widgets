import * as wml from '@quenk/wml';
import * as names from '@package/wml-widgets/common/names';
import { concat } from '@package/wml-widgets/common/util';
import { Main } from './wml/menu';

export interface MenuAttrs extends wml.Attrs {

    ww?: {

        /**
         * class styles for the root element (ul).
         */
        class?: string,

        /**
         * hidden indicates the menu should be hidden.
         */
        hidden?: boolean

        /**
         * hideOnExternalClick hides the menu when an external click event takes place.
         */
        hideOnExternalClick?: boolean,

        /**
         * hideOnClick hides the menu when an internal click event takes place.
         */
        hideOnClick?: boolean

    }

}

/**
 * Menu 
 */
export class Menu extends wml.Component<MenuAttrs>{

    view: wml.View = new Main(this);

    values = {

        id: {

            root: 'root',
            target: 'menu'

        },
        class: {

            root: concat(names.MENU, (this.attrs.ww && this.attrs.ww.class) ?
                this.attrs.ww.class : '', (this.attrs.ww && this.attrs.ww.hidden) ?
                    names.HIDDEN : '')

        },
        content: this.children,
        click: {

            hideOnClick: (this.attrs.ww && (this.attrs.ww.hideOnClick != null)) ?
                this.attrs.ww.hideOnClick : true,

            hideOnExternalClick: (this.attrs.ww && (this.attrs.ww.hideOnExternalClick != null)) ?
                this.attrs.ww.hideOnExternalClick : true

        }

    };

    /**
     * isHidden 
     */
    isHidden(): boolean {

        return this.view.findById(this.values.id.root)
            .cata(() => false, (e: HTMLElement) => e.classList.contains(names.HIDDEN));

    }

    /**
     * hide the menu.
     */
    hide(): Menu {

        this.view.findById(this.values.id.root)
            .map((e: HTMLElement) =>
                e.classList.add(names.HIDDEN));

        return this;

    }

    /**
     * show this menu.
     */
    show(): Menu {

        this.view.findById(this.values.id.root)
            .map((e: HTMLElement) =>
                e.classList.remove(names.HIDDEN));

        return this;

    }

    /**
     * toggle this menu's visibility
     */
    toggle(): Menu {

        this.view.findById(this.values.id.root)
            .map((e: HTMLElement) =>
                e.classList.toggle(names.HIDDEN));

        return this;

    }

    /**
     * setContent of this menu.
     */
    setContent(view: wml.Renderable): Menu {

        this.values.content = [view.render()];
        this.view.invalidate();
        return this;

    }

    handleEvent(e: Event): void {

        this
            .view
            .findById(this.values.id.root)
            .map((root: HTMLElement) => {

                if (!document.body.contains(root))
                    document.removeEventListener('click', this);

                if ((!root.contains(<Node>e.target)) && this.values.click.hideOnExternalClick)
                    this.hide();

            });

    }

    rendered() {

        //window.addEventListener('click', this);

    }

}
