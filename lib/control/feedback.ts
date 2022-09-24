import * as style from '../content/style';
import * as document from '@quenk/wml/lib/dom';

import { View } from '@quenk/wml';

import { getById } from '../util';
import { Control, ControlAttrs, AbstractControl } from '../control';
import { } from '../';

/**
 * ValidationState
 */
export enum ValidationState {

    Neutral = 'neutral',
    Error = 'error',
    Success = 'success',
    Warning = 'warning'

}

/**
 * Message type.
 */
export type Message = string;

/**
 * FeedbackControlAttrs 
 */
export interface FeedbackControlAttrs<V> extends ControlAttrs<V> {

    /**
     * message to display to the user.
     */
    message?: Message,

    /**
     * error message to display to the user.
     */
    error?: Message,

    /**
     * success message to display to the user.
     */
    success?: Message,

    /**
     * warning message to display to the user.
     */
    warning?: Message

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
export interface FeedbackControl<V, A extends FeedbackControlAttrs<V>>
    extends Control<V, A> {

    /**
     * setMessage on the control.
     */
    setMessage(msg: Message): FeedbackControl<V, A>;

    /**
     * removeMessage from the control.
     */
    removeMessage(): FeedbackControl<V, A>

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
export abstract class
    AbstractFeedbackControl<V, A extends FeedbackControlAttrs<V>>
    extends AbstractControl<V, A> implements FeedbackControl<V, A> {

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

                id: string

            }

        },
        messages: {

            wml: {

                id: string

            }

        }

    };

    setMessage(msg: Message): AbstractFeedbackControl<V, A> {

        setMessage(this.view, this.values.messages.wml.id, msg);
        return this;

    }

    removeMessage(): AbstractFeedbackControl<V, A> {

        removeMessage(this.view, this.values.messages.wml.id);
        return this;

    }

    setValidationState(state: ValidationState): AbstractFeedbackControl<V, A> {

        setValidationState(this.view, this.values.control.wml.id, state);
        return this;

    }

    removeValidationState(): AbstractFeedbackControl<V, A> {

        removeValidationState(this.view, this.values.control.wml.id);
        return this;

    }

    getValidationState(): ValidationState {

        return getValidationState(this.view, this.values.control.wml.id);

    }

}

/**
 * setMessage helper.
 */
export const setMessage = (view: View, id: string, msg: string) =>
    getById<HTMLElement>(view, id)
        .map(messages => {

            let node = document.createTextNode(msg);

            while (messages.lastChild)
                messages.removeChild(messages.lastChild);

            messages.appendChild(node);

        });

/**
 * removeMessage
 */
export const removeMessage = (view: View, id: string) =>
    getById<HTMLElement>(view, id)
        .map(messages => {

            while (messages.lastChild)
                messages.removeChild(messages.lastChild);

        });

/** 
 * setValidationState helper.
 */
export const setValidationState =
    (view: View, id: string, state: ValidationState): void => {

        removeValidationState(view, id);

        if (state !== ValidationState.Neutral)
            getById<HTMLElement>(view, id)
                .map(e => e.classList.add(validationState2ClassName(state)))

    }

/**
 * removeValidationState helper.
 */
export const removeValidationState = (view: View, id: string): void => {
    getById<HTMLElement>(view, id)
        .map((h: HTMLElement) => {

            h.classList.remove(style.SUCCESS);
            h.classList.remove(style.ERROR);
            h.classList.remove(style.WARNING);

        });

}

/**
 * getValidationState calculates the ValidationState of an HTMLElement
 * (identified by id) by analysing its class list.
 */
export const getValidationState = (view: View, id: string): ValidationState =>
    getById<HTMLElement>(view, id)
        .map(h => {

            if (h.classList.contains(style.SUCCESS))
                return ValidationState.Success;
            else if (h.classList.contains(style.WARNING))
                return ValidationState.Warning;
            else if (h.classList.contains(style.ERROR))
                return ValidationState.Error
            else
                return ValidationState.Neutral

        })
        .get();

/**
 * getValidityClassName provides the applicable style class by checking
 * the validity properties of FeedbackControAttrs.
 */
export const getValidityClassName =
    <V>(attrs: FeedbackControlAttrs<V>): string => {

        if (attrs) {

            if (attrs.error && (attrs.error != ''))
                return style.ERROR;

            if (attrs.warning && (attrs.warning != ''))
                return style.WARNING;

            if (attrs.success && (attrs.success != ''))
                return style.SUCCESS;

        }

        return '';

    }

/**
 * getMessage
 */
export const getMessage =
    <V>(attrs: FeedbackControlAttrs<V>) => {

        if (attrs) {

            if (attrs.error && (attrs.error != ''))
                return attrs.error;

            if (attrs.warning && (attrs.warning != ''))
                return attrs.warning;

            if (attrs.success && (attrs.success != ''))
                return attrs.success;

            if (attrs.message && (attrs.message != ''))
                return attrs.message;

        }

        return '';

    }

/**
 * validationState2ClassName transforms a ValidationState into 
 * the corresponding class name (if any).
 */
export const validationState2ClassName = (state: ValidationState): string => {

    if (state === ValidationState.Success)
        return style.SUCCESS;
    else if (state === ValidationState.Warning)
        return style.WARNING;
    else if (state === ValidationState.Error)
        return style.ERROR;
    else
        return ''

}
