import { Maybe } from '@quenk/noni/lib/data/maybe';

///classNames:begin
/**
 * OPEN state.
 */
export const OPEN = '-open';
///classNames:end

/**
 * Open
 */
export type Open<W extends Openable> = () => W;

/**
 * Close
 */
export type Close<W extends Openable> = () => W;

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
export const open =
    <W extends Openable>(w: W) =>
    (fn: () => Maybe<HTMLElement>): Open<W> =>
    () =>
        fn()
            .map((e: HTMLElement) => e.classList.add(OPEN))
            .map(() => w)
            .orJust(() => w)
            .get();

/**
 * close this widget.
 */
export const close =
    <W extends Openable>(w: W) =>
    (fn: () => Maybe<HTMLElement>): Close<W> =>
    () =>
        fn()
            .map((e: HTMLElement) => e.classList.remove(OPEN))
            .map(() => w)
            .orJust(() => w)
            .get();
