import * as names from '../common/names';
import * as views from './wml/menu-item';
import * as wml from '@quenk/wml';
import { concat } from '../common/util';
import { MenuItemClickedEvent } from './MenuItemClickedEvent';

export interface MenuItemAttrs extends wml.Attrs {

    ww?: {

        name?: string,
        text?: string,
        disabled?: boolean
        onClick?: (e: MenuItemClickedEvent) => void

    }

}

/**
 * MenuItem
 */
export class MenuItem extends wml.Component<MenuItemAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        id: {

            root: 'root'

        },
        class: {

            root: concat(names.MENU_ITEM,
                (this.attrs.ww && this.attrs.ww.disabled) ?
                    names.DISABLED : null)

        },
        text: (this.attrs.ww && this.attrs.ww.text) ?
            this.attrs.ww.text : null,

        clicked: ()=> (this.attrs.ww && this.attrs.ww.onClick) ?
            this.attrs.ww.onClick(
                new MenuItemClickedEvent(this.attrs.ww.name)) : () => { }

    }

}
