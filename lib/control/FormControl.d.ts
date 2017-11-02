import { Control } from './Control';
import { FormControlAttrs } from './FormControlAttrs';
import { FormControlValues } from './FormControlValues';
import { Delegate } from './Delegate';
export declare abstract class FormControl<V, A extends FormControlAttrs<V>> extends Control<A> {
    abstract values: FormControlValues;
    delegate: Delegate<V>;
    /**
     * isFilled
     */
    /**
     * clear
     */
    /**
     * isRequired tells if the Input was required.
     * @deprecated
     */
    isRequired(): boolean;
    /**
     * hasClass queries whether a class exists on the root element on not.
     */
    hasClass(cls: string): boolean;
    hasError(): boolean;
    hasWarning(): boolean;
    hasSuccess(): boolean;
    /**
     * setHelpText sets the message for the message portion of
     * this input.
     */
    setHelpText(msg: string): FormControl<V, A>;
    setState(state: string): FormControl<V, A>;
    /**
     * removeState removes the state validation state from the input.
     */
    removeState(): FormControl<V, A>;
    /**
     * state
     */
    state(): string;
    /**
     * setSuccess
     */
    setSuccess(message: string): FormControl<V, A>;
    /**
     * setError
     */
    setError(message: string): FormControl<V, A>;
    /**
     * setWarning
     */
    setWarning(message: string): FormControl<V, A>;
    /**
     * reset
     */
    reset(): FormControl<V, A>;
    /**
     * rendered checks if the input should have a validation state set
     */
    rendered(): void;
}
