import { ControlWWAttrs } from './ControlWWAttrs';
/**
 * FormControlWWAttrs are attributes all input like widgets support.
 */
export interface FormControlWWAttrs<V> extends ControlWWAttrs<V> {
    /**
     * label value to display for FormControls that support internal labels.
     */
    label?: string;
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
    /**
     * readOnly makes controls that support it readOnly.
     */
    readOnly?: boolean;
    /**
     * required acts as a flag to indicate that this control must
     * be satisfied.
     */
    required?: boolean;
    /**
     * placeholder text.
     */
    placeholder?: string;
}
