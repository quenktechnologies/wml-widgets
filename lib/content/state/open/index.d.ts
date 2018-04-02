import { Maybe } from 'afpl/lib/monad/Maybe';
/**
 * OPEN state.
 */
export declare const OPEN = "-open";
/**
 * Open
 */
export declare type Open<W extends Openable> = () => W;
/**
 * Close
 */
export declare type Close<W extends Openable> = () => W;
/**
 * Openable is an interface for widgets that open or close to show
 * or reveal content, typically inline.
 */
export interface Openable {
    /**
     * open the Openable.
     */
    open: () => Openable;
    /**
     * close the Openable.
     */
    close: () => Openable;
}
/**
 * open the widget.
 */
export declare const open: <W extends Openable>(w: W) => (fn: () => Maybe<HTMLElement>) => Open<W>;
/**
 * close this widget.
 */
export declare const close: <W extends Openable>(w: W) => (fn: () => Maybe<HTMLElement>) => Close<W>;
