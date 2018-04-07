import * as style from '../../content/style';
import { View } from '@quenk/wml';
import { Maybe } from 'afpl/lib/monad/Maybe';
import { Control, ControlAttrs, GenericControl } from '../../control';

/**
 * @module control/feedback
 */

export const NEUTRAL = 0x0;
export const ERROR = 0x1;
export const SUCCESS = 0x2;
export const WARNING = 0x3;

/**
 * ValidationState
 */
export enum ValidationState {
    NEUTRAL,
    ERROR,
    SUCCESS,
    WARNING
}

/**
 * Success
 */
export type Success<V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>
    = (message?: string) => C
    ;

/**
 * Warning
 */
export type Warning<V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>
    = (message?: string) => C
    ;

/**
 * Error
 */
export type Error<V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>
    = (message?: string) => C
    ;

/**
 * Neutral
 */
export type Neutral<V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>
    = (message?: string) => C
    ;

/**
 * SetMessage
 */
export type SetMessage<V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>
    = (message: string) => C
    ;

/**
 * GetValidationState
 */
export type GetValidationState
    = () => ValidationState
    ;

/**
 * FeedbackControlAttrs are the ww attributes common to all FeedbackControls.
 *
 * Some of these may be ignored by implementations.
 */
export interface FeedbackControlAttrs<V> extends ControlAttrs<V> {

    /**
     * success allows the control to be intialized in the valid state with 
     * a message.
     */
    success?: string,

    /**
     * error allows the control to be intialized in the invalid state with
     * a message.
     */
    error?: string,

    /**
     * warning allows the control to be intilalized in the warn state with
     * a message.
     */
    warning?: string,

}

/**
 * FeedbackControl is a Control that provides visual hints as to 
 * the validity of the value entered in the Control.
 */
export interface FeedbackControl<V, A extends FeedbackControlAttrs<V>>
    extends Control<V, A> {

    /**
     * setMessage on the control.
     */
    setMessage(msg: string): FeedbackControl<V, A>;

    /**
     * success sets a success message on the FeedbackControl.
     */
    success(message?: string): FeedbackControl<V, A>;

    /**
     * error sets an error message on the FeedbackControl.
     */
    error(message?: string): FeedbackControl<V, A>;

    /**
     * warning sets a warning messages on the FeedbackControl.
     */
    warning(message?: string): FeedbackControl<V, A>;

    /**
     * neutral clears any validation state on the control.
     */
    neutral(): FeedbackControl<V, A>;

    /**
     * getValidationState returns the a value representing the 
     * validation state of the control
     */
    getValidationState(): ValidationState;

}

/**
 * GenericFeedbackControl provides a base implementation of a FeedbackControl.
 */
export abstract class GenericFeedbackControl<V, A extends FeedbackControlAttrs<V>>
    extends GenericControl<V, A> implements FeedbackControl<V, A>  {

    /**
     * view of the Control.
     */
    abstract view: View;

    /**
     * values provided to the view template.
     */
    abstract values: {

        /**
         * root element values
         */
        root: {

            /**
             * id of the root element.
             */
            id: string

        }

    }

    setMessage: SetMessage<V, A, GenericFeedbackControl<V, A>> =
        setMessage(this)(_root(this));

    success: Success<V, A, GenericFeedbackControl<V, A>> =
        success(this)(_root(this));

    warning: Warning<V, A, GenericFeedbackControl<V, A>> =
        warning(this)(_root(this));

    error: Error<V, A, GenericFeedbackControl<V, A>> =
        error(this)(_root(this));

    neutral: Neutral<V, A, GenericFeedbackControl<V, A>> =
        neutral(this)(_root(this));

    getValidationState: GetValidationState =
        getValidationState(_root(this));

}

const _root = <V, A extends FeedbackControlAttrs<V>, C extends GenericFeedbackControl<V, A>>
    (c: C) => () => c.view.findById<HTMLElement>(c.values.root.id);

/** 
 * setState helper.
 */
export const setState = <V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>
    (c: C) => (fn: () => Maybe<HTMLElement>) => (state: string) => (m: string = '') =>
        Maybe
            .fromAny(c.neutral())
            .map((c: C) => c.setMessage(m))
            .chain(() => fn())
            .map(e => e.classList.add(state))
            .map(() => c)
            .get();

/** 
 * success helper.
 */
export const success = <V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>
    (c: C) => (fn: () => Maybe<HTMLElement>): Success<V, A, C> => setState(c)(fn)(style.SUCCESS);

/**
 * warning helper.
 */
export const warning = <V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>
    (c: C) => (fn: () => Maybe<HTMLElement>): Warning<V, A, C> => setState(c)(fn)(style.WARNING);

/**
 * error helper.
 */
export const error = <V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>
    (c: C) => (fn: () => Maybe<HTMLElement>): Error<V, A, C> => setState(c)(fn)(style.ERROR);

/**
 * setMessage helper.
 */
export const setMessage = <V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>
    (c: C) => (fn: () => Maybe<HTMLElement>): SetMessage<V, A, C> => (msg: string): C =>
        fn()
            .map((message: HTMLElement) => {

                let node = document.createTextNode(msg);

                if (message.firstChild) {
                    message.replaceChild(node, message.firstChild);
                } else {
                    message.appendChild(node);
                }

            })
            .map(() => c)
            .orJust(() => c)
            .get();

/**
 * neutral clears validation states from a control.
 */
export const neutral = <V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>
    (c: C) => (fn: () => Maybe<HTMLElement>): Neutral<V, A, C> => () =>
        fn()
            .map((h: HTMLElement) => {

                h.classList.remove(style.SUCCESS);
                h.classList.remove(style.ERROR);
                h.classList.remove(style.WARNING);

            })
            .map(() => c.setMessage(''))
            .orJust(() => c)
            .get();

/**
 * getValidationState default.
 */
export const getValidationState =
    (fn: () => Maybe<HTMLElement>): GetValidationState => () =>
        fn()
            .map(h => h.classList.contains(style.SUCCESS) ?
                SUCCESS :
                h.classList.contains(style.WARNING) ?
                    WARNING :
                    h.classList.contains(style.ERROR) ?
                        ERROR : NEUTRAL)
            .get();

/**
 * selectState from an attribute list.
 */
export const selectState = (attrs: { success?: string, error?: string, warning?: string }) =>
    attrs.success ? style.SUCCESS :
        attrs.error ? style.ERROR :
            attrs.warning ? style.WARNING : '';
