import { Maybe } from 'afpl/lib/monad/Maybe';

///classNames:begin
/**
 * ACTIVE
 */
export const ACTIVE = '-active';
///classNames:end

/**
 * Activate
 */
export type Activate<A extends Activatable> = () => A;

/**
 * Deactivate
 */
export type Deactivate<A extends Activatable> = () => A;

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
export const deactivate = <A extends Activatable>(a: A) => (fn: () => Maybe<HTMLElement>)
    : Deactivate<A> => () =>
        fn()
            .map((e: HTMLElement) => e.classList.remove(ACTIVE))
            .map(() => a)
            .orJust(() => a)
            .get();

/**
 * activate this nav list Item.
 */
export const activate = <A extends Activatable>(a: A) => (fn: () => Maybe<HTMLElement>)
    : Deactivate<A> => () =>
        fn()
            .map((e: HTMLElement) => {
                e.classList.remove(ACTIVE);
                e.classList.add(ACTIVE);
            })
            .map(() => a)
            .orJust(() => a)
            .get();

