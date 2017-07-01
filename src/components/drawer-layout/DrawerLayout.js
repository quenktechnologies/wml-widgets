import { View, Widget } from '@quenk/wml/lib/runtime';
import * as Styles from 'common/Styles';
import view from './wml/view';

/**
 * DrawerLayout provides a top level layout consisting of a drawer and
 * a main content view.
 */
export class DrawerLayout extends Widget {

    _getDrawerDOM() {

        return this.view.findById('drawer');

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

        return !this._getDrawerDOM().classList.contains(Styles.HIDDEN);

    }

    /**
     * hideDrawer hides the drawer.
     */
    hideDrawer() {

        if (this.drawerVisible())
            this._getDrawerDOM().classList.add(Styles.HIDDEN);

    }

    /**
     * showDrawer shows the drawer
     */
    showDrawer() {

        if (!this.drawerVisible())
            this._getDrawerDOM().classList.remove(Styles.HIDDEN);

    }

    /**
     * toggle the visibility of this Drawer
     */
    toggle() {

        this._getDrawerDOM().classList.toggle(Styles.HIDDEN);

    }

    onRendered() {

        if (window.matchMedia('(max-width: 480px').matches)
            window.addEventListener('click', this);

    }

    handleEvent(e) {

        if (e instanceof MouseEvent) {

            let drawer = this.view.findById('drawer');
            let target = e.target;

            if ((target !== drawer) || (!drawer.contains(target)))
                if (!window.document.contains(drawer))
                    window.removeEventListener(this);
                else
                    this.hideDrawer();

        }

    }

    render() {

        if (this.children.length !== 2)
            console.warn(`DrawerLayout: Expected 2 child widgets got ${this.children.length}!`);

        return this.view = View.render(view, this);

    }

}

export default DrawerLayout
