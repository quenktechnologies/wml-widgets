import { View } from '@quenk/wml';
import { Control, ControlAttrs, AbstractControl } from '../control';
import { WidgetAttrs } from '../';
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
     *  validationState of the control.
       */
    validationState?: ValidationState;
    /**
     * message to display to the user.
     */
    message?: string;
}
/**
 * FeedbackControl is a Control that provides visual hints as to
 * the validity of the value entered in the Control.
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
     * getValidationState returns the a value representing the
     * validation state of the control
     */
    getValidationState(): ValidationState;
}
/**
 * AbstractFeedbackControl implementaion.
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
        /**
         * control element values
         */
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
export declare const setMessage: (view: View, id: string, msg: string) => import("@quenk/noni/lib/data/maybe").Maybe<void>;
/**
 * removeMessage
 */
export declare const removeMessage: (view: View, id: string) => import("@quenk/noni/lib/data/maybe").Maybe<void>;
/**
 * setValidationState helper.
 */
export declare const setValidationState: (view: View, id: string, state: ValidationState) => void;
/**
 * removeValidationState helper.
 */
export declare const removeValidationState: (view: View, id: string) => void;
/**
 * getValidationState default.
 */
export declare const getValidationState: (view: View, id: string) => ValidationState;
/**
 * getVSClassNameFromAttrs
 */
export declare const getVSClassNameFromAttrs: <V>(attrs: WidgetAttrs<FeedbackControlAttrs<V>>) => "-success" | "-warning" | "-error" | "";
/**
 * getValidationStateClassName
 */
export declare const getValidationStateClassName: (state: ValidationState) => "-success" | "-warning" | "-error" | "";
