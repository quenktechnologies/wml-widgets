import * as views from './wml/list';
import { View } from '@quenk/wml';
import { concat } from '../../util';
import {
    ACTIVE,
    Activate,
    activate,
    deactivate,
    isActive
} from '../../content/state/active';
import { LAYOUT, LayoutAttrs, AbstractLayout } from '../';

///classNames:begin
export const LIST_LAYOUT = 'ww-list-layout';
export const LIST_LAYOUT_ITEM = 'ww-list-layout__item';
///classNames:end

/**
 * ListLayoutAttrs
 */
export interface ListLayoutAttrs extends LayoutAttrs { }

/**
 * ListLayoutItemAttrs
 */
export interface ListLayoutItemAttrs extends LayoutAttrs {

    /**
     * name of the item.
     */
    name?: string,

    /**
     * active highlight.
     */
    active?: boolean,

    /**
     * onClick handler.
     */
    onClick?: (name: string) => void

}

/**
 * ListLayoutItem 
 */
export class ListLayoutItem extends AbstractLayout<ListLayoutItemAttrs>
    implements Activate {

    view: View = new views.ListLayoutItem(this);

    values = {

        content: {

            wml: {

                id: 'item'

            },

            id: (this.attrs.ww && this.attrs.ww.id) ? this.attrs.ww.id : '',

            className: concat(LIST_LAYOUT_ITEM,
                (this.attrs.ww && this.attrs.ww.active) ? ACTIVE : ''),

            name: (this.attrs.ww && this.attrs.ww.name) ? this.attrs.ww.name : '',

            onclick: () => {

                if (this.attrs.ww && this.attrs.ww.onClick)
                    this.attrs.ww.onClick(this.attrs.ww &&
                        this.attrs.ww.name || '');

            }

        }

    }

    isActive(): boolean {

        return isActive(this.view, this.values.content.wml.id);

    }

    activate(): ListLayoutItem {

        activate(this.view, this.values.content.wml.id);
        return this;

    }

    deactivate(): ListLayoutItem {

        deactivate(this.view, this.values.content.wml.id);
        return this;

    }

    toggleActive(): ListLayoutItem {

        if (this.isActive())
            this.deactivate();
        else
            this.activate();

        return this;

    }

}

/**
 * ListLayout is used to create a vertical list of content.
 *
 * Children must be ListGroupItems.
 */
export class ListLayout extends AbstractLayout<ListLayoutAttrs> {

    view: View = new views.ListLayout(this);

    values = {

        content: {

            wml: {

                id: 'list'

            },
            id: this.attrs.ww && this.attrs.ww.id,

            className: concat(LIST_LAYOUT, LAYOUT,
                (this.attrs.ww && this.attrs.ww.className) ?
                    this.attrs.ww.className : '')

        }

    }

}


