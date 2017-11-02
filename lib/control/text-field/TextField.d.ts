import * as wml from '@quenk/wml';
import { FormControl } from '@package/self/control';
import { TextFieldAttrs } from './TextFieldAttrs';
/**
 * TextField
 */
export declare class TextField extends FormControl<string, TextFieldAttrs> {
    view: wml.View;
    values: {
        root: {
            id: string;
            class: string;
        };
        help: {
            id: string;
            success: string;
            error: string;
            warning: string;
        };
        input: {
            id: string;
            class: string;
            name: string;
            type: string;
            placeholder: string;
            value: string;
            disabled: boolean;
            readOnly: boolean;
            rows: number;
            onInput: (e: KeyboardEvent) => void;
        };
    };
}
