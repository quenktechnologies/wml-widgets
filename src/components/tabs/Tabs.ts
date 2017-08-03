import { Component, Attrs } from '@quenk/wml-runtime';
import * as Styles from 'wml-widgets-common/Styles'
import { noop } from 'wml-widgets-common/util'
import { TabView, TabsView } from './wml/tabs';

export interface TabAttrs extends Attrs {

    ww?: {

        active?: boolean,
        text?: string

    }

}

export interface TabsAttrs extends Attrs { }

/**
 * Tab
 */
export class Tab extends Component<TabAttrs> {

    view = new TabView(this);

    /**
     * click this Tab
     */
    click() {

        (<HTMLElement>this.view.ids.link).click();

    }

    clicked(e) {

        e.preventDefault();

        var parent = (<HTMLElement>this.view.ids.root).parentNode;
        var us = (<HTMLElement>parent).children;

        for (var i = 0; i < us.length; i++)
            us[i].classList.remove(Styles.ACTIVE);

        (<HTMLElement>this.view.ids.root).classList.add(Styles.ACTIVE);
        (<Function>this.attributes.read('ww:onClick', noop))(this.attributes.read('ww:name'));

    }

}

/**
 * Tabs
 */
export class Tabs extends Component<TabsAttrs> {

    view = new TabsView(this);

}
