import { Control } from './Control';
import { FormControlAttrs } from './FormControlAttrs';
import { FormControlValues } from './FormControlValues';
import { Delegate } from './Delegate';
import { DefaultDelegate } from './DefaultDelegate';

const INPUT_SUCCESS = 'has-success';
const INPUT_ERROR = 'has-error';
const INPUT_WARNING = 'has-warning';

export abstract class FormControl<V, A extends FormControlAttrs<V>> extends Control<A> {

    abstract values: FormControlValues;

    delegate: Delegate<V> = this.attrs.ww.delegate ?
        this.attrs.ww.delegate : new DefaultDelegate(this.attrs.ww);

    /**
     * isFilled
     */
    //   abstract isFilled(): boolean;

    /**
     * clear
     */
   // abstract clear(): FormControl<V, A>;

    /**
     * isRequired tells if the Input was required.
     * @deprecated
     */
    isRequired(): boolean {

        return (this.attrs.ww.required);

    }

    /**
     * hasClass queries whether a class exists on the root element on not.
     */
    hasClass(cls: string): boolean {

        return this
            .view
            .findById(this.values.root.id)
            .cata(() => false, ((e: HTMLElement) =>
                e.className.split(' ').indexOf(cls) === -1));

    }

    hasError(): boolean {

        return this.hasClass(INPUT_ERROR);

    }

    hasWarning(): boolean {

        return this.hasClass(INPUT_WARNING);

    }

    hasSuccess(): boolean {

        return this.hasClass(INPUT_SUCCESS);

    }

    /**
     * setHelpText sets the message for the message portion of
     * this input.
     */
    setHelpText(msg: string): FormControl<V, A> {

        return this
            .view
            .findById(this.values.help.id)
            .map((message: HTMLElement) => {

                var node = document.createTextNode(msg);

                if (message.firstChild) {
                    message.replaceChild(node, message.firstChild);
                } else {
                    message.appendChild(node);
                }

            })
            .cata(() => this, () => this);

    }

    setState(state: string): FormControl<V, A> {

        return this
            .view
            .findById(this.values.root.id)
            .map((e: HTMLElement) => e.classList.add(state))
            .cata(() => this, () => this);

    }

    /**
     * removeState removes the state validation state from the input.
     */
    removeState(): FormControl<V, A> {

        return this
            .view
            .findById(this.values.root.id)
            .map((h: HTMLElement) => {

                h.classList.remove(INPUT_SUCCESS);
                h.classList.remove(INPUT_ERROR);
                h.classList.remove(INPUT_WARNING);

            })
            .cata(() => this, () => this);

    }

    /**
     * state
     */
    state(): string {

        return this.attrs.ww.success ?
            'has-success' :
            this.attrs.ww.error ?
                'has-error' :
                this.attrs.ww.warning ?
                    'has-warning' :
                    '';
    }

    /**
     * setSuccess 
     */
    setSuccess(message: string): FormControl<V, A> {

        return this
            .removeState()
            .setHelpText(message)
            .setState(INPUT_SUCCESS);

    }

    /**
     * setError
     */
    setError(message: string): FormControl<V, A> {

        return this
            .removeState()
            .setHelpText(message)
            .setState(INPUT_ERROR);

    }

    /**
     * setWarning
     */
    setWarning(message: string): FormControl<V, A> {

        return this
            .removeState()
            .setHelpText(message)
            .setState(INPUT_WARNING);

    }

    /**
     * reset
     */
    reset(): FormControl<V, A> {

        return this
            .view
            .findById(this.values.help.id)
            .map((m: HTMLElement) => {

                this.removeState();

                while (m.firstChild)
                    m.removeChild(m.firstChild);

              //  this.clear();

            })
            .cata(() => this, () => this);

    }

    /**
     * rendered checks if the input should have a validation state set
     */
    rendered(): void {

        let { success, error, warning } = this.attrs.ww;

        if (success)
            this.setSuccess((typeof success === 'string') ? success : '');

        else if (error)
            this.setError((typeof error === 'string') ? error : '');

        else if (warning)
            this.setWarning((typeof warning === 'string') ? warning : '')

    }

}


