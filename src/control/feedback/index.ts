import * as names from '../../content/style';
import { View } from '@quenk/wml';
import { Control, ControlAttrs, ControlAttrsProperties } from '../../control';

/**
 * @module control/feedback
 */

export const NEUTRAL = 0x0;
export const ERROR = 0x1;
export const SUCCESS = 0x2;
export const WARNING = 0x3;

/**
 * FeedbackControlAttrsProperties are the ww attributes common to all FeedbackControls.
 *
 * Some of these may be ignored by implementations.
 */
export interface FeedbackControlAttrsProperties extends ControlAttrsProperties {

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
 * FeedbackControlAttrs
 */
export interface FeedbackControlAttrs extends ControlAttrs {

    ww: FeedbackControlAttrsProperties;

}

/**
 * FeedbackControl is a Control that provides visual hints as to 
 * the validity of the value entered in the Control.
 */
export interface FeedbackControl<A extends FeedbackControlAttrs> extends Control<A> {

    /**
     * message sets a message on the control.
     */
    message(msg: string): FeedbackControl<A>;

    /**
     * success sets a success message on the FeedbackControl.
     */
    success(message: string): FeedbackControl<A>;

    /**
     * error sets an error message on the FeedbackControl.
     */
    error(message: string): FeedbackControl<A>;

    /**
     * warning sets a warning messages on the FeedbackControl.
     */
    warning(message: string): FeedbackControl<A>;

    /**
     * clear any validation state on the control.
     */
    clear(): FeedbackControl<A>;

}

export interface FeedbackControlWidget<A extends FeedbackControlAttrs>
    extends FeedbackControl<A> {

    /**
     * view of the FeedbackControl
     */
    view: View;

    /**
     * values used in the view.
     */
    values: {

        /**
         * root element values.
         */
        root: {

            /**
             * id of the root element.
             */
            id: string

        },
        /**
         * messages element values.
         */
        messages: {

            /**
             * id of the messages element.
             */
            id: string

        }

    }

}

/**
 * setState helper for changing the state of the displayed DOM.
 */
export const setState = <A extends FeedbackControlAttrs, C extends FeedbackControlWidget<A>>
    (c: C) => (state: string): C =>
        c
            .clear()
            .view
            .findById(c.values.root.id)
            .map((e: HTMLElement) => e.classList.add(state))
            .map(() => c)
            .orJust(() => c)
            .get();

/** 
 * setSuccess helper.
 */
export const setSuccess = <A extends FeedbackControlAttrs, C extends FeedbackControlWidget<A>>
    (c: C) => (): C => setState<A, C>(c)(names.SUCCESS);

/**
 * setWarning helper.
 */
export const setWarning = <A extends FeedbackControlAttrs, C extends FeedbackControlWidget<A>>
    (c: C) => (): C => setState(c)(names.WARNING);

/**
 * setError helper.
 */
export const setError = <A extends FeedbackControlAttrs, C extends FeedbackControlWidget<A>>
    (c: C) => (): C => setState(c)(names.ERROR);

/**
 * setMessage helper for setting a message on a FeedbackControl.
 */
export const setMessage = <A extends FeedbackControlAttrs, C extends FeedbackControlWidget<A>>
    (c: C) => (msg: string): C =>
        c
            .view
            .findById(c.values.messages.id)
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
 * clear validation states from a control.
 */
export const clear = <A extends FeedbackControlAttrs, C extends FeedbackControlWidget<A>>
    (c: C) => (): C =>
        c
            .view
            .findById(c.values.root.id)
            .map((h: HTMLElement) => {

                h.classList.remove(names.SUCCESS);
                h.classList.remove(names.ERROR);
                h.classList.remove(names.WARNING);

            })
            .map(() => c)
            .orJust(() => c)
            .get();

/**
 * selectState from an attribute list.
 */
export const selectState = (attrs: { success?: string, error?: string, warning?: string }) =>
    attrs.success ? names.SUCCESS :
        attrs.error ? names.ERROR :
            attrs.warning ? names.WARNING : '';
