import { View } from '@quenk/wml';
/**
 * HIDDEN means an element should not be visible but not removed
 * from the DOM.
 */
export declare const HIDDEN = "-ww-hidden";
/**
 * Hidable is widget that has a Hidden mode.
 *
 * This is usually implemented by styling around the occurance of the
 * HIDDEN class name.
 */
export interface Hidable {
    /**
     * isHidden indicates the DOM for the widget is hidden.
     */
    isHidden(): boolean;
    /**
     * hide the DOM of the widget.
     */
    hide(): Hidable;
    /**
     * show the DOM of the widget.
     */
    show(): Hidable;
    /**
     * toggle between show and hide states
     */
    toggle(): Hidable;
}
/**
 * isHidden helper.
 *
 * Retrieves an HTMLElement by id and checks whether
 * it has the hidden class attached.
 */
export declare const isHidden: (view: View, id: string) => boolean;
/**
 * hide helper.
 *
 * Attempts to add HIDDEN to the target elements class name.
 */
export declare const hide: (view: View, id: string) => void;
/**
 * show helper.
 *
 * Attempts to remove the HIDDEN class name from the target element.
 */
export declare const show: (view: View, id: string) => void;
/**
 * toggle helper.
 *
 * Attempts to toggle the HIDDEN class name from the target element
 * classList.
 */
export declare const toggle: (view: View, id: string) => void;
