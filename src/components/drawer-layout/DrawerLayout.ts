import { AbstractWidget, WMLElement } from '@quenk/wml/lib/runtime';
import * as Styles from 'common/Styles';
import { Main } from './wml/view';

/**
 * DrawerLayout provides a top level layout consisting of a drawer and
 * a main content view.
 */
export class DrawerLayout extends AbstractWidget {

    view = new Main(this);

    _getDrawerDOM(): WMLElement {

        return this.view.findById('drawer');

    }

    _combine(classes: string[]) {

        return classes.join(' ');

    }

    /**
     * drawerContent provides the content for this layout's Drawer.
     */
    drawerContent() {

        return this.children[0];

    }

    /**
     * mainViewContent provides the content for this layout's MainView.
     */
    mainViewContent() {

        return this.children[1];

    }

    /**
     * drawerVisible queries whether the Drawer is visible or not.
     * @returns {Boolean}
     */
    drawerVisible() {

        return !(<Element>this._getDrawerDOM()).classList.contains(Styles.HIDDEN);

    }

    /**
     * hideDrawer hides the drawer.
     */
    hideDrawer() {

        if (this.drawerVisible())
            (<Element>this._getDrawerDOM()).classList.add(Styles.HIDDEN);

    }

    /**
     * showDrawer shows the drawer
     */
    showDrawer() {

        if (!this.drawerVisible())
            (<Element>this._getDrawerDOM()).classList.remove(Styles.HIDDEN);

    }

    /**
     * toggle the visibility of this Drawer
     */
    toggle() {

        (<Element>this._getDrawerDOM()).classList.toggle(Styles.HIDDEN);

    }

    rendered() {

        if (window.matchMedia('(max-width: 480px').matches)
            window.addEventListener('click', this);

    }

    handleEvent(e) {

        if (e instanceof MouseEvent) {

            let drawer = this.view.findById('drawer');
            let target = e.target;

            if ((target !== drawer) && (!(<Node>drawer).contains(<Node>target)))
                if (!window.document.contains(<Node>drawer))
                    window.removeEventListener('click', this);
                else
                    this.hideDrawer();

        }

    }

    render() {

        if (this.children.length !== 2)
            console.warn(`DrawerLayout: Expected 2 child widgets got ${this.children.length}!`);

        return this.view.render();

    }

}

export default DrawerLayout
