import { View } from '@quenk/wml';
/**
 * FocusableAttrs
 */
export interface FocusableAttrs {
    /**
     * focus indicates whether the control should steal focus once rendered.
     */
    focus?: boolean;
    /**
     * onFocusGained handler
     */
    onFocusGained?: (e: FocusGainedEvent) => void;
    /**
     * onFocusLost handler
     */
    onFocusLost?: (e: FocusLostEvent) => void;
}
/**
 * Focusable indicates a control can gain focus for keyboard input.
 */
export interface Focusable {
    /**
     * focus instructs the control to steal the user's focus.
     */
    focus(): void;
}
/**
 * FocusGainedEvent
 */
export declare class FocusGainedEvent {
    name: string;
    constructor(name: string);
}
/**
 * FocusLostEvent
 */
export declare class FocusLostEvent {
    name: string;
    constructor(name: string);
}
/**
 * focus DOM helper.
 */
export declare const focus: (view: View, id: string) => void;
