import { Component } from '@quenk/wml';
import { getClassName, getId, HTMLElementAttrs } from '../..';

import { BusyOverlayView } from './views/busy-overlay';

///classNames:begin
export const BUSY = 'ww-busy';
///classNames:end

/**
 * BusyOverlayAttrs
 */
export interface BusyOverlayAttrs extends HTMLElementAttrs {
    /**
     * hidden if true, will cause the overlay to be hidden.
     */
    hidden?: boolean;
}

/**
 * BusyOverlay covers a relative positioned parent with a spinner to hint that
 * some processing is taking place.
 *
 * Use for file upload, form submissions etc.
 */
export class BusyOverlay extends Component<BusyOverlayAttrs> {
    view = new BusyOverlayView(this);

    values = {
        id: getId(this.attrs),

        className: getClassName(
            this.attrs,
            'ww-busy-overlay',
            this.attrs.hidden ? 'ww-hidden' : ''
        )
    };
}
