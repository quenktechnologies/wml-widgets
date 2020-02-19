import { View, Component } from '@quenk/wml';
import { debounce } from '@quenk/noni/lib/control/timer';

import { DISABLED } from '../../content/state/disabled';
import { TextChangedEvent } from '../text-input';
import { concat } from '../../util';
import { WidgetAttrs, getId, getClassName, HTMLElementAttrs } from '../../';
import { Event as ControlEvent } from '../';
import { PaginatorView, PositionView } from './wml/paginator';

///classNames:begin
export const PAGINATOR = 'ww-paginator';
export const PAGINATOR_FIRST = 'ww-paginator__first';
export const PAGINATOR_PREVIOUS = 'ww-paginator__previous';
export const PAGINATOR_POSITION = 'ww-paginator__position';
export const PAGINATOR_NEXT = 'ww-paginator__next';
export const PAGINATOR_LAST = 'ww-paginator__last';
///classNames:end

/**
 * PaginatorAttrs
 */
export interface PaginatorAttrs extends HTMLElementAttrs {

    /**
     * name of the control.
     */
    name?: string,

    /**
     * total number of paged items.
     *
     * When this value is supplied the Paginator will not allow the user
     * to navigate beyond this point. The value is zero by default.
     */
    total?: number,

    /**
     * current indicates the current page that is displayed whent the widget
     * is first displayed.
     */
    current?: number,

    /**
     * positionView can be specified to custom render the position part 
     * of the paginator.
     *
     * This view MUST begin with a <li> element.
     */
    positionView?: (c: PositionViewContext) => View,

    /**
     * onChange handler.
     */
    onChange?: (e: PageChangedEvent) => void

}

/**
 * PageChangedEvent indicating the current page has been changed.
 */
export class PageChangedEvent extends ControlEvent<number>{ }

/**
 * PositionViewContext contains the info needed to render the positon part of
 * the paginator.
 */
export class PositionViewContext {

    constructor(
        public className: string,
        public current: number,
        public total: number,
        public onChange: (e: TextChangedEvent) => void) { }

}

/**
 * Paginator provides a control for navigating paged data, results, view etc.
 */
export class Paginator extends Component<WidgetAttrs<PaginatorAttrs>> {

    view: View = new PaginatorView(this);

    values = {

        id: getId(this.attrs),

        className: concat(PAGINATOR, getClassName(this.attrs)),

        current: {

            value: (this.attrs.ww && this.attrs.ww.current) ?
                this.attrs.ww.current : 1,

        },

        total: (this.attrs.ww && this.attrs.ww.total) ?
            this.attrs.ww.total : 1,

        first: {

            className: PAGINATOR_FIRST,

            isDisabled: () => (this.values.current.value <= 1),

            onclick: (e: Event) => {

                e.preventDefault();

                this.values.current.value = 1;

                this.fire();

            }

        },

        previous: {

            className: PAGINATOR_PREVIOUS,

            isDisabled: () => (this.values.current.value <= 1),

            onclick: (e: Event) => {

                e.preventDefault();

                this.values.current.value = this.values.current.value - 1;

                this.fire();

            }

        },

        position: {

            className: PAGINATOR_POSITION,

            view: () => {

                let ctx = new PositionViewContext(
                    this.values.position.className,
                    this.values.current.value,
                    this.values.total, debounce((e: TextChangedEvent) => {

                        let n = Number(e.value);

                        if ((n > 0) && (n <= this.values.total)) {

                            this.values.current.value = n;

                            this.fire();

                        }

                    }, 5000));

                return ((this.attrs.ww && this.attrs.ww.positionView) ?
                    this.attrs.ww.positionView(ctx) :
                    new PositionView(ctx)).render();

            }

        },

        next: {

            className: PAGINATOR_NEXT,

            isDisabled: () => (this.values.current.value >= this.values.total),

            onclick: (e: Event) => {

                e.preventDefault();

                this.values.current.value = this.values.current.value + 1;

                this.fire();

            }

        },

        last: {

            className: PAGINATOR_LAST,

            isDisabled: () => (this.values.current.value >= this.values.total),

            onclick: (e: Event) => {

                e.preventDefault();

                this.values.current.value = this.values.total;

                this.fire();

            }

        },

        disabled: {

            className: DISABLED

        }

    }

    /**
     * @private
     */
    fire() {

        if (this.attrs.ww && this.attrs.ww.onChange)
            this.attrs.ww.onChange(
                new PageChangedEvent(this.attrs.ww.name || '',
                    this.values.current.value));

        this.view.invalidate();

    }

}
