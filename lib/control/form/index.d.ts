import { Control, ControlAttrs } from '../';
/**
 * @module control
 *
 * The form module deals with controls specifically for accepting user input.
 */
/**
 * FormControlAtrrs
 */
export interface FormControlAttrs<V> extends ControlAttrs<V> {
    /**
     * label for the control.
     */
    label?: string;
}
/**
 * FormControl generates events based on user input.
 */
export interface FormControl<V, A extends FormControlAttrs<V>> extends Control<V, A> {
    /**
     * get provides the current value of a FormControlear;make
     *
     */
    get(): V;
    /**
     * set the current value of a FormControl.
     */
    set(value: V): FormControl<V, A>;
}
