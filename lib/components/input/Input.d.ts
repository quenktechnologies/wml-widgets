import { Component, Attrs } from '@quenk/wml-runtime';
import { InputView, SelectView } from './wml/input';
export declare type Opt = string | {
    label: string;
    value: string | number;
};
export interface InputAttrs extends Attrs {
    ww?: {
        id?: string;
        label?: string;
        message?: string;
        variant?: string;
        title?: string;
        name?: string;
        value?: string | number;
        required?: boolean;
        type?: string;
        disabled?: boolean;
        readonly?: boolean;
        placeholder?: string;
        options?: Opt[];
        rows?: number;
        delegate?: InputDelegate;
        onInput?: (e: Event) => void;
    };
}
/**
 * InputDelegate is an interface inputs can delegate all their events to.
 */
export interface InputDelegate {
    onInput(e: Event): void;
}
export declare class DefaultInputDelegate {
    input: Input;
    constructor(input: Input);
    onInput(e: Event): void;
}
/**
 * Input
 */
export declare class Input extends Component<InputAttrs> {
    view: InputView<this>;
    delegate: InputDelegate;
    readonly name: string;
    readonly value: string;
    initialValue(): any;
    /**
     * getClass
     */
    getClass(): string;
    /**
     * setMessage sets the message for the message portion of
     * this input.
     */
    setMessage(msg?: string): void;
    /**
     * isFilled tells if this Input has a filled value.
     */
    isFilled(): boolean;
    /**
     * isRequired tells if the Input was required.
     */
    isRequired(): boolean;
    /**
     * isValid queries whether the Input has been invalidated
     * or not.
     */
    isValid(): boolean;
    /**
     * removeValidationState removes the state validation state from the input.
     */
    removeValidationState(): void;
    /**
     * invalidate this Input with an optional message.
     * @param {string} message
     * @returns {Input}
     */
    invalidate(message?: string): void;
    /**
     * validate this input with an optional messsage.
     * @param {string} message
     * @returns {Input}
     */
    validate(message?: string): void;
    /**
     * warn this input with an optional message.
     * @param {string} message
     * @returns {Input}
     */
    warn(message?: string): void;
    /**
     * reset this input to a clean state.
     * Removes messages, validation state etc.
     * @return {Input}
     */
    reset(): void;
}
export declare class Select extends Input {
    view: SelectView<this>;
}
