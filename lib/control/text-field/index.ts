import * as wml from '@quenk/wml';
import { FormControlValues } from '@package/self/control';
import { TextField } from './TextField';

export {TextField};
export { TextFieldWWAttrs } from './TextFieldWWAttrs';
export { TextFieldAttrs } from './TextFieldAttrs';
export { TextChangedEvent } from './TextChangedEvent';

/**
 * TextFieldValues available to the TextField template.
 */
export interface TextFieldValues extends FormControlValues {


    /**
     * root values.
     */
    root: {

        id: string,

        /**
         * class names for the group.
         */
        class: string

    },

    /**
     * values for the help block.
     */
    help: {

        /**
         * id is the wml:id assigned to the help block.
         */
        id: string,

        /**
         * success message,
         */
        success: string

        /**
         * error message.
         */
        error: string,

        /**
         * warning message.
         */
        warning: string

    },

    /**
     * label values.
     */
    label: {

        /**
         * id is the wml id for the label.
         */
        id: string,

        /**
         * text for the label.
         */
        text: string

    },


    /**
     * control values.
     */
    control: {

        /**
         * id is the wml id for the control.
         */
        id: string,

        /**
         * template for rendering the control.
         */
        template: (tf: TextField) => wml.Template,

        /**
         * class names for the control.
         */
        class: string,

        /**
         * name of the control.
         */
        name: string,

        /**
         * type of the control.
         */
        type: string,

        /**
         * focus state of the control.
         */
        focus: boolean,

        /**
         * placeholder text for the control.
         */
        placeholder: string,

        /**
         * value of the control.
         */
        value: string,

        /**
         * disabled status of the control.
         */
        disabled: boolean,

        /**
         * readOnly status of the control.
         */
        readOnly: boolean,

        /**
         * rows indicates the number of rows for the control.
         *
         * Setting this to more than one will use a textarea instead.
         */
        rows: number,

        /**
         * oninput event handler.
         */
        oninput: (e: KeyboardEvent) => void

    }
}
