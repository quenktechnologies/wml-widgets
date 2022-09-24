import { View } from '@quenk/wml';
import { Control, ControlAttrs, AbstractControl } from '../control';
/**
 * ValidationState
 */
export declare enum ValidationState {
    Neutral = "neutral",
    Error = "error",
    Success = "success",
    Warning = "warning"
}
/**
 * Message type.
 */
export declare type Message = string;
/**
 * FeedbackControlAttrs
 */
export interface FeedbackControlAttrs<V> extends ControlAttrs<V> {
    /**
     * message to display to the user.
     */
    message?: Message;
    /**
     * error message to display to the user.
     */
    error?: Message;
    /**
     * success message to display to the user.
     */
    success?: Message;
    /**
     * warning message to display to the user.
     */
    warning?: Message;
}
/**
 * FeedbackControl is a Control that can provide visual hints to users about
 * the validity of the data they input.
 *
 * A FeedbackControl can has the following validity states:
 *
 * Neutral (Default)
 * Error
 * Warning
 * Success.
 */
export interface FeedbackControl<V, A extends FeedbackControlAttrs<V>> extends Control<V, A> {
    /**
     * setMessage on the control.
     */
    setMessage(msg: Message): FeedbackControl<V, A>;
    /**
     * removeMessage from the control.
     */
    removeMessage(): FeedbackControl<V, A>;
    /**
     * setValidationState of the control.
     */
    setValidationState(state: ValidationState): FeedbackControl<V, A>;
    /**
     * removeValidationState removes all validation states from the control.
     */
    removeValidationState(): FeedbackControl<V, A>;
    /**
     * getValidationState returns a value representing the
     * validation state of the control
     */
    getValidationState(): ValidationState;
}
/**
 * AbstractFeedbackControl
 *
 * Provides a default implementaion of the interface methods.
 */
export declare abstract class AbstractFeedbackControl<V, A extends FeedbackControlAttrs<V>> extends AbstractControl<V, A> implements FeedbackControl<V, A> {
    /**
     * view of the Control.
     */
    abstract view: View;
    /**
     * values provided to the view template.
     */
    abstract values: {
        control: {
            wml: {
                id: string;
            };
        };
        messages: {
            wml: {
                id: string;
            };
        };
    };
    setMessage(msg: Message): AbstractFeedbackControl<V, A>;
    removeMessage(): AbstractFeedbackControl<V, A>;
    setValidationState(state: ValidationState): AbstractFeedbackControl<V, A>;
    removeValidationState(): AbstractFeedbackControl<V, A>;
    getValidationState(): ValidationState;
}
/**
 * setMessage helper.
 */
export declare const setMessage: (view: View, id: string, msg: string) => import("@quenk/wml").Maybe<void>;
/**
 * removeMessage
 */
export declare const removeMessage: (view: View, id: string) => import("@quenk/wml").Maybe<void>;
/**
 * setValidationState helper.
 */
export declare const setValidationState: (view: View, id: string, state: ValidationState) => void;
/**
 * removeValidationState helper.
 */
export declare const removeValidationState: (view: View, id: string) => void;
/**
 * getValidationState calculates the ValidationState of an HTMLElement
 * (identified by id) by analysing its class list.
 */
export declare const getValidationState: (view: View, id: string) => ValidationState;
/**
 * getValidityClassName provides the applicable style class by checking
 * the validity properties of FeedbackControAttrs.
 */
export declare const getValidityClassName: <V>(attrs: FeedbackControlAttrs<V>) => string;
/**
 * getMessage
 */
export declare const getMessage: <V>(attrs: FeedbackControlAttrs<V>) => string;
/**
 * validationState2ClassName transforms a ValidationState into
 * the corresponding class name (if any).
 */
export declare const validationState2ClassName: (state: ValidationState) => string;
