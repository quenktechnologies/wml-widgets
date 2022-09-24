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

            id: (this.attrs && this.attrs.id) ? this.attrs.id : '',

            className: concat(LIST_LAYOUT_ITEM,
                (this.attrs && this.attrs.active) ? ACTIVE : ''),

            name: (this.attrs && this.attrs.name) ? this.attrs.name : '',

            onclick: () => {

                if (this.attrs && this.attrs.onClick)
                    this.attrs.onClick(this.attrs &&
                        this.attrs.name || '');

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
            id: this.attrs && this.attrs.id,

            className: concat(LIST_LAYOUT, LAYOUT,
                (this.attrs && this.attrs.className) ?
                    this.attrs.className : '')

        }

    }

}


