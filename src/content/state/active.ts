import { View } from '@quenk/wml';
import { getById } from '../../util';

///classNames:begin
/**
 * ACTIVE
 */
export const ACTIVE = '-active';
///classNames:end

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
export const activate = (view: View, id: string) =>
    getById<HTMLElement>(view, id).map((e: HTMLElement) => {
        e.classList.remove(ACTIVE);
        e.classList.add(ACTIVE);
    });

/**
 * deactivate helper.
 *
 * Removes the ACTIVE class.
 */
export const deactivate = (view: View, id: string) =>
    getById<HTMLElement>(view, id).map((e: HTMLElement) =>
        e.classList.remove(ACTIVE)
    );

/**
 * isActive helpder
 *
 * Queries whether the ACTIVE class is present.
 */
export const isActive = (view: View, id: string): boolean =>
    getById<HTMLElement>(view, id)
        .map((e: HTMLElement) => e.classList.contains(ACTIVE))
        .orJust(() => false)
        .get();
