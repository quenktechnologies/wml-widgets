import { View, Widget } from '@quenk/wml';

import { getById } from '../util';

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
export const update = <D>(view: View, id: string, data: D[]) =>
    getById<Updatable<D>>(view, id).map(w => w.update(data));
