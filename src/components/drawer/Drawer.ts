import { Component, WMLElement, Attrs, Macro } from '@quenk/wml-runtime';
import * as Styles from 'wml-widgets-common/Styles';
import { Main } from './wml/drawer';

export interface DrawerAttrs extends Attrs {

    ww?: {

        content?: Macro<void>
    }
};

/**
 * Drawer provides an area for navigation content.
 */
export class Drawer extends Component<DrawerAttrs>{

    view = new Main(this);

    _getDrawerDOM(): Element {

        return <Element>this.view.findById('drawer');

    }

    /**
     * visible queries whether the Drawer is visible or not.
     */
    visible() :boolean {

        return !this._getDrawerDOM().classList.contains(Styles.HIDDEN);

    }

    /**
     * hide the drawer.
     */
    hide():void {

        if (this.visible())
            this._getDrawerDOM().classList.add(Styles.HIDDEN);

    }

    /**
     * showDrawer shows the drawer
     */
    show():void {

        if (!this.visible())
            this._getDrawerDOM().classList.remove(Styles.HIDDEN);

    }

    /**
     * toggle the visibility of this Drawer
     */
    toggle() : void{

        this._getDrawerDOM().classList.toggle(Styles.HIDDEN);

    }

}

