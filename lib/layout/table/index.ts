import * as views from './wml/table';
import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import {
    WidgetAttrs,
    HTMLElementAttrs,
    getId,
    getClassName
} from '../../';

///classNames:begin
export const TABLE_HEADER = 'ww-table-layout__header';
export const TABLE_BODY = 'ww-table-layout__body';
export const TABLE_FOOTER = 'ww-table-layout__footer';
export const TABLE_ROW = 'ww-table-layout__row';
export const TABLE_HEADING = 'ww-table-layout _heading';
export const TABLE_CELL = 'ww-table-layout__cell';
export const TABLE_LAYOUT = 'ww-table-layout';
export const TABLE_WINDOW = 'ww-table-window';
export const BORDERED = '-bordered';
export const COMPACT = '-compact';
export const ALTERNATE = '-alternate';
export const HOVERABLE = '-hoverable';
///classNames:end

/**
 * TableHeaderAttrs
 */
export interface TableHeaderAttrs extends HTMLElementAttrs { }

/**
 * TableBodyAttrs
 */
export interface TableBodyAttrs extends HTMLElementAttrs { }

/**
 * TableFooterAttrs
 */
export interface TableFooterAttrs extends HTMLElementAttrs { }

/**
 * TableRowAttrs
 */
export interface TableRowAttrs extends HTMLElementAttrs {

    /**
     * onclick handler
     */
    onclick: EventListener

}

/**
 * TableCellAttrs
 */
export interface TableCellAttrs extends HTMLElementAttrs {

    /**
     * onclick handler
     */
    onclick: EventListener

}

/**
 * TableHeadingAttrs
 */
export interface TableHeadingAttrs extends TableCellAttrs { }

/**
 * TableWindowAttrs
 */
export interface TableWindowAttrs extends HTMLElementAttrs { }

/**
 * TableLayoutAttrs
 */
export interface TableLayoutAttrs extends HTMLElementAttrs {

    /**
     * alternate enables alternating row styling.
     */
    alternate?: boolean,

    /**
     * hoverable enables hover effect styles.
     */
    hoverable?: boolean,

    /**
     * bordered enables cell border styles.
     */
    bordered?: boolean,

    /**
     * compact will enable compact table style.
     */
    compact?: boolean,

}

/**
 * TableHeader (<thead>)
 */
export class TableHeader extends Component<WidgetAttrs<TableHeaderAttrs>>{

    view: View = new views.TableHeader(this);

    values = {

        id: getId(this.attrs),

        className: concat(TABLE_HEADER, getClassName(this.attrs))

    }

}

/**
 * TableBody
 */
export class TableBody extends Component<WidgetAttrs<TableBodyAttrs>> {

    view: View = new views.TableBody(this);

    values = {

        id: getId(this.attrs),

        className: concat(TABLE_BODY, getClassName(this.attrs))

    }

}

/**
 * TableFooter
 */
export class TableFooter extends Component<WidgetAttrs<TableFooterAttrs>> {

    view: View = new views.TableFooter(this);

    values = {

        id: getId(this.attrs),

        className: concat(TABLE_FOOTER, getClassName(this.attrs))

    }

}

/**
 * TableRow
 */
export class TableRow extends Component<WidgetAttrs<TableRowAttrs>> {

    view: View = new views.TableRow(this);

    values = {

        id: getId(this.attrs),

        className: concat(TABLE_ROW, getClassName(this.attrs)),

        onclick: (this.attrs.ww && this.attrs.ww.onclick) ?
            this.attrs.ww.onclick : undefined

    }

}

/**
 * TableHeading
 */
export class TableHeading extends Component<WidgetAttrs<TableHeadingAttrs>> {

    view: View = new views.TableHeading(this);

    values = {

        id: getId(this.attrs),

        className: concat(TABLE_HEADING, getClassName(this.attrs)),

        onclick: (this.attrs.ww && this.attrs.ww.onclick) ?
            this.attrs.ww.onclick : undefined

    }

}

/**
 * TableCell
 */
export class TableCell extends Component<WidgetAttrs<TableCellAttrs>> {

    view: View = new views.TableCell(this);

    values = {

        id: getId(this.attrs),

        className: concat(TABLE_CELL, getClassName(this.attrs)),

        onclick: (this.attrs.ww && this.attrs.ww.onclick) ?
            this.attrs.ww.onclick : undefined

    }

}

/**
 * TableWindow allows a TableLayout to be scrolled on smaller screens.
 */
export class TableWindow extends Component<WidgetAttrs<TableWindowAttrs>> {

    view: View = new views.TableWindow(this);

    values = {

        id: getId(this.attrs),

        className: concat(TABLE_WINDOW, getClassName(this.attrs))

    }

}

/**
 * TableLayout provides a <table> based layout.
 */
export class TableLayout extends Component<WidgetAttrs<TableLayoutAttrs>> {

    view: View = new views.TableLayout(this);

    values = {

            wml: {

                id: 'table'

            },
            id: getId(this.attrs),

            className: concat(TABLE_LAYOUT, getClassName(this.attrs),
                (this.attrs.ww && this.attrs.ww.alternate) ? ALTERNATE : '',
                (this.attrs.ww && this.attrs.ww.bordered) ? BORDERED : '',
                (this.attrs.ww && this.attrs.ww.compact) ? COMPACT : '',
                (this.attrs.ww && this.attrs.ww.hoverable) ? HOVERABLE : ''),

    }

}
