import { View } from '@quenk/wml';
import { Maybe } from 'afpl/lib/monad/Maybe';
import { Control, ControlAttrs, GenericControl } from '../../control';
/**
 * @module control/feedback
 */
export declare const NEUTRAL = 0;
export declare const ERROR = 1;
export declare const SUCCESS = 2;
export declare const WARNING = 3;
/**
 * ValidationState
 */
export declare enum ValidationState {
    NEUTRAL = 0,
    ERROR = 1,
    SUCCESS = 2,
    WARNING = 3,
}
/**
 * Success
 */
export declare type Success<V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>> = (message?: string) => C;
/**
 * Warning
 */
export declare type Warning<V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>> = (message?: string) => C;
/**
 * Error
 */
export declare type Error<V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>> = (message?: string) => C;
/**
 * Neutral
 */
export declare type Neutral<V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>> = (message?: string) => C;
/**
 * SetMessage
 */
export declare type SetMessage<V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>> = (message: string) => C;
/**
 * GetValidationState
 */
export declare type GetValidationState = () => ValidationState;
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
    success?: string;
    /**
     * error allows the control to be intialized in the invalid state with
     * a message.
     */
    error?: string;
    /**
     * warning allows the control to be intilalized in the warn state with
     * a message.
     */
    warning?: string;
}
/**
 * FeedbackControl is a Control that provides visual hints as to
 * the validity of the value entered in the Control.
 */
export interface FeedbackControl<V, A extends FeedbackControlAttrs<V>> extends Control<V, A> {
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
export declare abstract class GenericFeedbackControl<V, A extends FeedbackControlAttrs<V>> extends GenericControl<V, A> implements FeedbackControl<V, A> {
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
            id: string;
        };
    };
    setMessage: SetMessage<V, A, GenericFeedbackControl<V, A>>;
    success: Success<V, A, GenericFeedbackControl<V, A>>;
    warning: Warning<V, A, GenericFeedbackControl<V, A>>;
    error: Error<V, A, GenericFeedbackControl<V, A>>;
    neutral: Neutral<V, A, GenericFeedbackControl<V, A>>;
    getValidationState: GetValidationState;
}
/**
 * setState helper.
 */
export declare const setState: <V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>(c: C) => (fn: () => Maybe<HTMLElement>) => (state: string) => (m?: string) => C;
/**
 * success helper.
 */
export declare const success: <V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>(c: C) => (fn: () => Maybe<HTMLElement>) => Success<V, A, C>;
/**
 * warning helper.
 */
export declare const warning: <V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>(c: C) => (fn: () => Maybe<HTMLElement>) => Warning<V, A, C>;
/**
 * error helper.
 */
export declare const error: <V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>(c: C) => (fn: () => Maybe<HTMLElement>) => Error<V, A, C>;
/**
 * setMessage helper.
 */
export declare const setMessage: <V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>(c: C) => (fn: () => Maybe<HTMLElement>) => SetMessage<V, A, C>;
/**
 * neutral clears validation states from a control.
 */
export declare const neutral: <V, A extends FeedbackControlAttrs<V>, C extends FeedbackControl<V, A>>(c: C) => (fn: () => Maybe<HTMLElement>) => Neutral<V, A, C>;
/**
 * getValidationState default.
 */
export declare const getValidationState: (fn: () => Maybe<HTMLElement>) => GetValidationState;
/**
 * selectState from an attribute list.
 */
export declare const selectState: (attrs: {
    success?: string;
    error?: string;
    warning?: string;
}) => "" | "-success" | "-warning" | "-error";
