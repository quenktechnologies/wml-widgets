import * as wml from '@quenk/wml';
import {
    Hidable,
    IsHidden,
    Hide,
    Show,
    Toggle,
    isHidden,
    hide,
    show,
    toggle
} from '../../content/state/hidden';
import { Group, GroupAttrs } from '../../content/Group';
import { Main } from './wml/drawer';

const getDom = (d: Drawer) => () =>
    d
        .view
        .findById(d.values.root.id)
        .map((e: wml.WMLElement) => <HTMLElement>e);

///classNames:begin
export const DRAWER = 'ww-drawer';
export const DRAWER_CONTENT = 'ww-drawer__content';
///classNames:end

/**
 * DrawerAttrs
 */
export interface DrawerAttrs extends GroupAttrs { }

/**
 * Drawer provides a widget for displaying navigation and other sidebar content.
 *
 * It's api allows for toggling between hidden and shown states as well as querying the
 * current state. 
 *
 * This widget's style intentionally gives it a high z-index so that it appears in-front
 * of other content. Adjust the respective style variables to change.
 */
export class Drawer extends Group<DrawerAttrs> implements Hidable {

    view: wml.View = new Main(this);

    isHidden: IsHidden = isHidden(getDom(this));

    hide: Hide<Drawer> = hide<Drawer>(this)(getDom(this));

    show: Show<Drawer> = show(this)(getDom(this));

    toggle: Toggle<Drawer> = toggle(this)(getDom(this));

    /**
     * values is a hash of values used in the template
     */
    values = {

        root: {

            id: 'drawer',

            class: DRAWER,

        },
        content: {

            class: DRAWER_CONTENT,

            render: () => (this.attrs.ww && this.attrs.ww.content) ?
                this.attrs.ww.content.render() :
                this.children

        }

    };

}


