import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs } from '../../';
import { Event as ControlEvent } from '../';
export declare const PAGER = "ww-pager";
export declare const PAGER_PREVIOUS = "ww-pager__first";
export declare const PAGER_NEXT = "ww-pager__next";
/**
 * PagerAttrs
 */
export interface PagerAttrs extends HTMLElementAttrs {
    /**
     * name of the control.
     */
    name?: string;
    /**
     * total number of paged items.
     *
     * When this value is supplied the Pager will not allow the user
     * to navigate beyond this point. The value is zero by default.
     */
    total?: number;
    /**
     * current indicates the current page that is displayed whent the widget
     * is first displayed.
     */
    current?: number;
    /**
     * previousText can be specified to change the default text dispayed for the
     * previous link.
     */
    previousText?: string;
    /**
     * nextText can be specified to change the default text dispayed for the
     * next link.
     */
    nextText?: string;
    /**
     * onChange handler.
     */
    onChange?: (e: PageSelectedEvent) => void;
}
/**
 * PageSelectedEvent indicates the user has clicked on a control to display
 * a different page in a result set.
 *
 * The value of this event is the page number that was selected.
 */
export declare class PageSelectedEvent extends ControlEvent<number> {
}
/**
 * Pager provides a control for step backwards or forwards through paginated
 * data.
 */
export declare class Pager extends Component<PagerAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
        current: number;
        total: number;
        previous: {
            className: string;
            isDisabled: () => boolean;
            text: string;
            onClick: () => void;
        };
        next: {
            className: string;
            text: string;
            isDisabled: () => boolean;
            onClick: () => void;
        };
    };
    /**
     * @private
     */
    fire(): void;
}
