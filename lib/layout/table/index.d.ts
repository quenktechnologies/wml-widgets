import { View, Component } from '@quenk/wml';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
export declare const TABLE_HEADER = "ww-table-layout__header";
export declare const TABLE_BODY = "ww-table-layout__body";
export declare const TABLE_FOOTER = "ww-table-layout__footer";
export declare const TABLE_ROW = "ww-table-layout__row";
export declare const TABLE_HEADING = "ww-table-layout _heading";
export declare const TABLE_CELL = "ww-table-layout__cell";
export declare const TABLE_LAYOUT = "ww-table-layout";
export declare const TABLE_WINDOW = "ww-table-window";
export declare const BORDERED = "-bordered";
export declare const COMPACT = "-compact";
export declare const ALTERNATE = "-alternate";
export declare const HOVERABLE = "-hoverable";
/**
 * TableHeaderAttrs
 */
export interface TableHeaderAttrs extends HTMLElementAttrs {
}
/**
 * TableBodyAttrs
 */
export interface TableBodyAttrs extends HTMLElementAttrs {
}
/**
 * TableFooterAttrs
 */
export interface TableFooterAttrs extends HTMLElementAttrs {
}
/**
 * TableRowAttrs
 */
export interface TableRowAttrs extends HTMLElementAttrs {
    /**
     * onclick handler
     */
    onclick?: EventListener;
}
/**
 * TableCellAttrs
 */
export interface TableCellAttrs extends HTMLElementAttrs {
    /**
     * colspan attribute
     */
    colspan?: number;
    /**
     * rowspan attribute
     */
    rowspan?: number;
    /**
     * onclick handler
     */
    onclick?: EventListener;
}
/**
 * TableHeadingAttrs
 */
export interface TableHeadingAttrs extends TableCellAttrs {
}
/**
 * TableWindowAttrs
 */
export interface TableWindowAttrs extends HTMLElementAttrs {
}
/**
 * TableLayoutAttrs
 */
export interface TableLayoutAttrs extends HTMLElementAttrs {
    /**
     * alternate enables alternating row styling.
     */
    alternate?: boolean;
    /**
     * hoverable enables hover effect styles.
     */
    hoverable?: boolean;
    /**
     * bordered enables cell border styles.
     */
    bordered?: boolean;
    /**
     * compact will enable compact table style.
     */
    compact?: boolean;
}
/**
 * TableHeader (<thead>)
 */
export declare class TableHeader extends Component<WidgetAttrs<TableHeaderAttrs>> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
/**
 * TableBody
 */
export declare class TableBody extends Component<WidgetAttrs<TableBodyAttrs>> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
/**
 * TableFooter
 */
export declare class TableFooter extends Component<WidgetAttrs<TableFooterAttrs>> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
/**
 * TableRow
 */
export declare class TableRow extends Component<WidgetAttrs<TableRowAttrs>> {
    view: View;
    values: {
        id: string;
        className: string;
        onclick: EventListener | undefined;
    };
}
/**
 * TableHeading
 */
export declare class TableHeading extends Component<WidgetAttrs<TableHeadingAttrs>> {
    view: View;
    values: {
        id: string;
        className: string;
        onclick: EventListener | undefined;
    };
}
/**
 * TableCell
 */
export declare class TableCell extends Component<WidgetAttrs<TableCellAttrs>> {
    view: View;
    values: {
        id: string;
        className: string;
        colspan: number;
        rowspan: number;
        onclick: EventListener | undefined;
    };
}
/**
 * TableWindow allows a TableLayout to be scrolled on smaller screens.
 */
export declare class TableWindow extends Component<WidgetAttrs<TableWindowAttrs>> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
/**
 * TableLayout provides a <table> based layout.
 */
export declare class TableLayout extends Component<WidgetAttrs<TableLayoutAttrs>> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
    };
}
