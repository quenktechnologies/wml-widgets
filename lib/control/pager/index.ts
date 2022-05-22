import { View, Component } from '@quenk/wml';

import { concat } from '../../util';
import { getId, HTMLElementAttrs } from '../../';
import { Event as ControlEvent } from '../';
import { PagerView } from './views';

///classNames:begin
export const PAGER = 'ww-pager';
export const PAGER_PREVIOUS = 'ww-pager__first';
export const PAGER_NEXT = 'ww-pager__next';
///classNames:end

const PREVIOUS_TEXT = '← Previous';
const NEXT_TEXT = 'Next →';

/**
 * PagerAttrs
 */
export interface PagerAttrs extends HTMLElementAttrs {

    /**
     * name of the control.
     */
    name?: string,

    /**
     * total number of paged items.
     *
     * When this value is supplied the Pager will not allow the user
     * to navigate beyond this point. The value is zero by default.
     */
    total?: number,

    /**
     * current indicates the current page that is displayed whent the widget
     * is first displayed.
     */
    current?: number,

    /**
     * previousText can be specified to change the default text dispayed for the
     * previous link.
     */
    previousText?: string,

    /**
     * nextText can be specified to change the default text dispayed for the
     * next link.
     */
    nextText?: string,

    /**
     * onChange handler.
     */
    onChange?: (e: PageSelectedEvent) => void

}

/**
 * PageSelectedEvent indicates the user has clicked on a control to display
 * a different page in a result set.
 *
 * The value of this event is the page number that was selected.
 */
export class PageSelectedEvent extends ControlEvent<number>{ }

/**
 * Pager provides a control for step backwards or forwards through paginated
 * data.
 */
export class Pager extends Component<PagerAttrs> {

    view: View = new PagerView(this);

    values = {

        id: getId(this.attrs),

        className: concat(PAGER, this.attrs.className),

        current: this.attrs.current || 1,

        total: this.attrs.total || 0,

        previous: {

            className: PAGER_PREVIOUS,

            isDisabled: () => (this.values.current <= 1) ||
                (this.values.total === 0),

            text: this.attrs.previousText || PREVIOUS_TEXT,

            onClick: () => {

                this.values.current = this.values.current - 1;

                this.fire();

            }

        },

        next: {

            className: PAGER_NEXT,

            text: this.attrs.nextText || NEXT_TEXT,

            isDisabled: () => this.values.current >= this.values.total,

            onClick: () => {

                this.values.current = this.values.current + 1;

                this.fire();

            }

        },

    }

    /**
     * @private
     */
    fire() {

        this.view.invalidate();

        if (this.attrs.onChange)
            this.attrs.onChange(new PageSelectedEvent(
                this.attrs.name || '', this.values.current));


    }

}
