import { View, Widget } from '@quenk/wml';
/**
 * Updatable indicates a Widget can be updated with new data for rendering.
 */
export interface Updatable<D> extends Widget {
    /**
     * update the data for this widget.
     *
     * Updates should cause the view to be revalidated.
     */
    update(dat: D[]): Updatable<D>;
}
/**
 * update an Updatable Widget in a view with the data provided.
 */
export declare const update: <D>(view: View, id: string, data: D[]) => import("@quenk/wml").Maybe<Updatable<D>>;
