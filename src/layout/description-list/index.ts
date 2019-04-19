import * as views from './wml/description-list';
import { View, Component } from '@quenk/wml';
import { HORIZONTAL } from '../../content/orientation';
import { concat } from '../../util';
import {
    WidgetAttrs,
    HTMLElementAttrs,
    getId,
    getClassName
} from '../../';

///classNames:begin
export const DESCRIPTION_LIST = 'ww-description-list';
export const DESCRIPTION_LIST_TITLE = 'ww-description-list__title';
export const DESCRIPTION_LIST_DATA = 'ww-description-list__data';
///classNames:end

/**
 * DescriptionListAttrs
 */
export interface DescriptionListAttrs extends HTMLElementAttrs {

    /**
     * horizontal if set will stack the title,data pairs horizontally.
     */
    horizontal?: boolean

}

/**
 * TitleAttrs
 */
export interface TitleAttrs extends HTMLElementAttrs { }

/**
 * DataAttrs
 */
export interface DataAttrs extends HTMLElementAttrs { }

/**
 * DescriptionList layout.
 */
export class DescriptionList
    extends
    Component<WidgetAttrs<DescriptionListAttrs>> {

    view: View = new views.DescriptionList(this);

    values = {

        id: getId(this.attrs),

        className: concat(DESCRIPTION_LIST,
            getClassName(this.attrs),
            (this.attrs.ww && this.attrs.ww.horizontal) ? HORIZONTAL : '')

    }

}

/**
 * Title
 */
export class Title extends Component<WidgetAttrs<TitleAttrs>> {

    view: View = new views.Title(this);

    values = {

        id: getId(this.attrs),

        className: concat(DESCRIPTION_LIST_TITLE, getClassName(this.attrs))

    }

}

/**
 * Data
 */
export class Data extends Component<WidgetAttrs<DataAttrs>> {

    view: View = new views.Data(this);

    values = {

        id: getId(this.attrs),

        className: concat(DESCRIPTION_LIST_DATA, getClassName(this.attrs))

    }

}
