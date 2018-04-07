import { Maybe } from 'afpl/lib/monad/Maybe';

///classNames:begin
/**
 * HIDDEN means an element should not be visible but not removed
 * from the DOM.
 */
export const HIDDEN = '-hidden';
///classNames:end

/**
 * IsHidden
 */
export type IsHidden = () => boolean;

/**
 * Hide
 */
export type Hide<H extends Hidable> = () => H;

/**
 * Show
 */
export type Show<H extends Hidable> = () => H;

/**
 * Toggle
 */
export type Toggle<H extends Hidable> = () => H;

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
export const isHidden = (fn: () => Maybe<HTMLElement>) => (): boolean =>
    fn()
        .map((e: HTMLElement) => !e.classList.contains(HIDDEN))
        .orJust(() => false)
        .get();

/**
 * hide the Hidable.
 *
 * This is acheived by adding a 'hidden' class name
 * to an HTMLElement retrieved by id. 
 */
export const hide = <H extends Hidable>(h: H) => (fn: () => Maybe<HTMLElement>)
    : Hide<H> => () =>
          fn()
.map((e:HTMLElement) => {e.classList.remove(HIDDEN); e.classList.add(HIDDEN); })
            .map(() => h)
            .orJust(() => h)
            .get();

/**
 * show the Hidable
 *
 * This is acheived by removing a 'hidden' class name
 * to an HTMLElement retrieved by id. 
 */
export const show = <H extends Hidable>(h: H) => (fn: () => Maybe<HTMLElement>)
    : Show<H> => () =>
        Maybe
            .fromBoolean(h.isHidden())
            .map(() => fn().map((e: HTMLElement) => e.classList.remove(HIDDEN)))
            .map(() => h)
            .orJust(() => h)
            .get();

/**
 * toggle the visibility of the Hidable.
 */
export const toggle = <H extends Hidable>(h: H) => (fn: () => Maybe<HTMLElement>)
    : Toggle<H> => () =>
        fn()
            .map((e: HTMLElement) => e.classList.toggle(HIDDEN))
            .map(() => h)
            .orJust(() => h)
            .get();
