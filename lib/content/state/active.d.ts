import { View } from '@quenk/wml';
/**
 * ACTIVE
 */
export declare const ACTIVE = "-active";
/**
 * Activate indicates a widget can be an active state.
 */
export interface Activate {
    /**
     * activate the widget.
     */
    activate(): Activate;
    /**
     * deactivate the widget.
     */
    deactivate(): Activate;
}
/**
 * activate helper.
 *
 * Adds the ACTIVE class.
 */
export declare const activate: (view: View, id: string) => import("@quenk/noni/lib/data/maybe").Maybe<void>;
/**
 * deactivate helper.
 *
 * Removes the ACTIVE class.
 */
export declare const deactivate: (view: View, id: string) => import("@quenk/noni/lib/data/maybe").Maybe<void>;
