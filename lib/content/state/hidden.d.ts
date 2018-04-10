import { Maybe } from 'afpl/lib/monad/Maybe';
/**
 * HIDDEN means an element should not be visible but not removed
 * from the DOM.
 */
export declare const HIDDEN = "-hidden";
/**
 * IsHidden
 */
export declare type IsHidden = () => boolean;
/**
 * Hide
 */
export declare type Hide<H extends Hidable> = () => H;
/**
 * Show
 */
export declare type Show<H extends Hidable> = () => H;
/**
 * Toggle
 */
export declare type Toggle<H extends Hidable> = () => H;
/**
 * Hidable represents some Widget that can be hidden.
 *
 * Switching between visible and hidden state is expected to
 * be done in CSS using the '__HIDDEN__' class name.
 */
export interface Hidable {
    /**
     * isHidden indicates the DOM for the widget is hidden.
     */
    isHidden: () => boolean;
    /**
     * hide the DOM of the widget.
     */
    hide: () => Hidable;
    /**
     * show the DOM of the widget.
     */
    show: () => Hidable;
    /**
     * toggle between show and hide states
     */
    toggle: () => Hidable;
}
/**
  * visible queries whether the Hidable is visible or not.
  *
  * It retrieves an HTMLElement by id and checks whether
  * it does not have a hidden class.
  */
export declare const isHidden: (fn: () => Maybe<HTMLElement>) => () => boolean;
/**
 * hide the Hidable.
 *
 * This is acheived by adding a 'hidden' class name
 * to an HTMLElement retrieved by id.
 */
export declare const hide: <H extends Hidable>(h: H) => (fn: () => Maybe<HTMLElement>) => Hide<H>;
/**
 * show the Hidable
 *
 * This is acheived by removing a 'hidden' class name
 * to an HTMLElement retrieved by id.
 */
export declare const show: <H extends Hidable>(h: H) => (fn: () => Maybe<HTMLElement>) => Show<H>;
/**
 * toggle the visibility of the Hidable.
 */
export declare const toggle: <H extends Hidable>(h: H) => (fn: () => Maybe<HTMLElement>) => Toggle<H>;
