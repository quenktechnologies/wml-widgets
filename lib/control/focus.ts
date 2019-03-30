import { View } from '@quenk/wml';
import { getById } from '../util';

/**
 * FocusableAttrs
 */
export interface FocusableAttrs {

    /**
     * focus indicates whether the control should steal focus once rendered.
     */
    focus?: boolean,

    /**
     * onFocusGained handler
     */
    onFocusGained?: (e: FocusGainedEvent) => void,

    /**
     * onFocusLost handler
     */
    onFocusLost?: (e: FocusLostEvent) => void

}

/**
 * Focusable indicates a control can gain focus for keyboard input.
 */
export interface Focusable {

    /**
     * focus instructs the control to steal the user's focus.
     */
    focus(): void

}

/**
 * FocusGainedEvent
 */
export class FocusGainedEvent { constructor(public name: string) { } }

/**
 * FocusLostEvent
 */
export class FocusLostEvent { constructor(public name: string) { } }

/**
 * focus DOM helper.
 */
export const focus = (view: View, id: string): void => {

    getById<HTMLElement>(view, id)
        .map(e => e.focus());

}
