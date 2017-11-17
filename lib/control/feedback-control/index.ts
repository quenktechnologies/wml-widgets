import * as wml from '@quenk/wml';
import { Control,ControlWWAttrs } from '@package/self/control';

export { FeedbackControlWidget } from './FeedbackControlWidget';

/**
 * FeedbackControl is a Control that provides visual hints as to 
 * the validity of the value entered in the Control.
 */
export interface FeedbackControl<A extends wml.Attrs> extends Control<A> {

    /**
     * values used in the template
     */
    values: FeedbackControlValues;

    /**
     * hasError queries whether the FeedbackControl has an error or not.
     */
    hasError(): boolean;

    /**
     * hasWarning queries whether the FeedbackControl has a warning or not.
     */
    hasWarning(): boolean;

    /**
     * hasSuccess queries whether the FeedbackControl has a success state or not.
     */
    hasSuccess(): boolean;

    /**
     * setMessage allows a textual message to be displayed in an area
     * associated with the FeedbackControl.
     */
    setMessage(msg: string): FeedbackControl<A>;

    /**
     * setSuccess sets a success message on the FeedbackControl.
     */
    setSuccess(message: string): FeedbackControl<A>;

    /**
     * setError sets an error message on the FeedbackControl.
     */
    setError(message: string): FeedbackControl<A>;

    /**
     * setWarning sets a warning messages on the FeedbackControl.
     */
    setWarning(message: string): FeedbackControl<A>;

    /**
     * clear state validation state from the control.
     */
    clear(): FeedbackControl<A>;

}

/**
 * FeedbackControlValues are values a FeedbackControl is expected to have.
 */
export interface FeedbackControlValues {

    /**
     * root values.
     */
    root: {

        /**
         * id for the root element.
         */
        id: string

    },

    /**
     * help values.
     */
    help: {

        /**
         * id for the help element
         */
        id: string


    }

}

/**
 * FeedbackControlWWAttrs are the ww attributes common to all FeedbackControls.
 *
 * Some of these may be ignored by implementations.
 */
export interface FeedbackControlWWAttrs extends ControlWWAttrs  {

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
 * hasClass queries whether a class exists on an element.
 *
 * This is how we distingush FeedbackControl states.
 */
export const hasClass = (cls: string, id: string, view: wml.View) =>
    view
        .findById(id)
        .cata(() => false, ((e: HTMLElement) =>
            e.className.split(' ').indexOf(cls) === -1));

/**
 * state is a helper.
 */
export const state = (attrs: {success?:string, error?:string, warning?:string}) =>
    attrs.success ? 'has-success' :
        attrs.error ? 'has-error' :
            attrs.warning ? 'has-warning' : '';
