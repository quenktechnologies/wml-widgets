import * as wml from '@quenk/wml';
import { TextField } from './TextField';
import { FormControlWWAttrs } from '@package/self/control';

export interface TextFieldWWAttrs extends FormControlWWAttrs<string> {

    /**
     * placeholder sets placeholder text for the control.
     */
    placeholder?: string,

    /**
     * type of the text field.
     */
    type?: string

    /**
     * rows more than 1 will use a textarea instead of an input.
     */
    rows?: number,

    /**
     * focus indicates this input should steal focus when rendered.
     */
    focus?: boolean,

    /**
     * control is a template for rendering the control.
     */
    control?: (t: TextField) => wml.Template,

}
