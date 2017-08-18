import { Component, Attrs } from '@quenk/wml-runtime';
import { TreeNavView, TreeNavItemView } from './wml/tree-nav';
import * as Styles from 'wml-widgets-common/Styles';

export interface TreeNavItemAttrs extends Attrs {

    ww: {

        name: string;
        onClick: (s: string) => void;

    }

}

/**
 * TreeNavItem is used to indicate an item in the tree.
 */
export class TreeNavItem extends Component<TreeNavItemAttrs> {

    view = new TreeNavItemView(this);

    /**
     * activate this TreeItem
     */
    activate(): void {

        var a = this.view.ids.link;

        if (a instanceof HTMLElement)
            if (a.parentNode instanceof HTMLElement) {

                var children = a.parentNode.children;

                a.classList.remove(Styles.ACTIVE);
                a.classList.add(Styles.ACTIVE);

                for (var i = 0; i < children.length; i++)
                    if (children[i].nodeName === 'A')
                        if (children[i] !== a)
                            children[i].classList.remove(Styles.ACTIVE);
            }
    }

    /**
     * deactivate this DrawerLink
     */
    deactivate(): void {

        (<HTMLElement>this.view.findById('a')).classList.remove(Styles.ACTIVE);

    }

}

export interface TreeAttrs extends Attrs { }

/**
 * TreeNav provides an api for displaying a tree of links.
 */
export class TreeNav extends Component<TreeAttrs> {

    view = new TreeNavView(this);

    handleEvent(e: Event): void {

        this.children.forEach(c => {

            if (c instanceof HTMLElement)
                if (c !== e.target)
                    c.classList.remove(Styles.ACTIVE);

        });

    }

    rendered() {

        this.children.forEach((c: EventTarget) => c.addEventListener('click', this));

    }


}
