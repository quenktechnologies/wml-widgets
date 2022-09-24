import { View, Component } from '@quenk/wml';
import { TextChangedEvent } from '../text-input';
import { HTMLElementAttrs } from '../../';
import { Event as ControlEvent } from '../';
export declare const PAGINATOR = "ww-paginator";
export declare const PAGINATOR_FIRST = "ww-paginator__first";
export declare const PAGINATOR_PREVIOUS = "ww-paginator__previous";
export declare const PAGINATOR_POSITION = "ww-paginator__position";
export declare const PAGINATOR_NEXT = "ww-paginator__next";
export declare const PAGINATOR_LAST = "ww-paginator__last";
/**
 * PaginatorAttrs
 */
export interface PaginatorAttrs extends HTMLElementAttrs {
    /**
     * name of the control.
     */
    name?: string;
    /**
     * total number of paged items.
     *
     * When this value is supplied the Paginator will not allow the user
     * to navigate beyond this point. The value is zero by default.
     */
    total?: number;
    /**
     * current indicates the current page that is displayed whent the widget
     * is first displayed.
     */
    current?: number;
    /**
     * positionView can be specified to custom render the position part
     * of the paginator.
     *
     * This view MUST begin with a <li> element.
     */
    positionView?: (c: PositionViewContext) => View;
    /**
     * onChange handler.
     */
    onChange?: (e: PageChangedEvent) => void;
}
/**
 * PageChangedEvent indicating the current page has been changed.
 */
export declare class PageChangedEvent extends ControlEvent<number> {
}
/**
 * PositionViewContext contains the info needed to render the positon part of
 * the paginator.
 */
export declare class PositionViewContext {
    className: string;
    current: number;
    total: number;
    onChange: (e: TextChangedEvent) => void;
    constructor(className: string, current: number, total: number, onChange: (e: TextChangedEvent) => void);
}
/**
 * Paginator provides a control for navigating paged data, results, view etc.
 */
export declare class Paginator extends Component<PaginatorAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
        current: {
            value: number;
        };
        total: number;
        first: {
            className: string;
            isDisabled: () => boolean;
            onclick: (e: Event) => void;
        };
        previous: {
            className: string;
            isDisabled: () => boolean;
            onclick: (e: Event) => void;
        };
        position: {
            className: string;
            view: () => import("@quenk/wml").Content;
        };
        next: {
            className: string;
            isDisabled: () => boolean;
            onclick: (e: Event) => void;
        };
        last: {
            className: string;
            isDisabled: () => boolean;
            onclick: (e: Event) => void;
        };
        disabled: {
            className: string;
        };
    };
    /**
     * @private
     */
    fire(): void;
}
