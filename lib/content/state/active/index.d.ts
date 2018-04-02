import { Maybe } from 'afpl/lib/monad/Maybe';
/**
 * Activate
 */
export declare type Activate<A extends Activatable> = () => A;
/**
 * Deactivate
 */
export declare type Deactivate<A extends Activatable> = () => A;
/**
 * Activatable indicates a widget can be an active state.
 */
export interface Activatable {
    /**
     * activate the widget.
     */
    activate: () => Activatable;
    /**
     * deactivate the widget.
     */
    deactivate: () => Activatable;
}
/**
 * deactivate this nav list item.
 */
export declare const deactivate: <A extends Activatable>(a: A) => (fn: () => Maybe<HTMLElement>) => Deactivate<A>;
/**
 * activate this nav list Item.
 */
export declare const activate: <A extends Activatable>(a: A) => (fn: () => Maybe<HTMLElement>) => Deactivate<A>;
