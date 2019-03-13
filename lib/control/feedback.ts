import * as style from '../content/style';
import { View } from '@quenk/wml';
import { getById } from '../util';
import { Control, ControlAttrs, AbstractControl } from '../control';
import { WidgetAttrs } from '../';

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
     *  validationState of the control.
       */
    validationState?: ValidationState,

    /**
     * message to display to the user.
     */
    message?: string,

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
     * getValidationState returns the a value representing the 
     * validation state of the control
     */
    getValidationState(): ValidationState;

}

/**
 * AbstractFeedbackControl implementaion.
 */
export abstract class AbstractFeedbackControl<V, A extends FeedbackControlAttrs<V>>
    extends AbstractControl<V, A> implements FeedbackControl<V, A>  {

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
  (view: View, id: string, state: ValidationState) : void =>  {

    removeValidationState(view, id);

    getById<HTMLElement>(view, id)
      .map(e => e.classList.add(getValidationStateClassName(state)))

  }

/**
 * removeValidationState helper.
 */
    export const removeValidationState = (view: View, id: string) : void => {
    getById<HTMLElement>(view, id)
        .map((h: HTMLElement) => {

            h.classList.remove(style.SUCCESS);
            h.classList.remove(style.ERROR);
            h.classList.remove(style.WARNING);

        });
    
    }

/**
 * getValidationState default.
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
 * getVSClassNameFromAttrs
 */
export const getVSClassNameFromAttrs =
    <V>(attrs: WidgetAttrs<FeedbackControlAttrs<V>>) =>
        (attrs.ww && attrs.ww.validationState) ?
            getValidationStateClassName(attrs.ww.validationState) : ''

/**
 * getValidationStateClassName
 */
export const getValidationStateClassName = (state: ValidationState) => {

    if (state === ValidationState.Success)
        return style.SUCCESS;
    else if (state === ValidationState.Warning)
        return style.WARNING;
    else if (state === ValidationState.Error)
        return style.ERROR;
    else
        return ''

}
