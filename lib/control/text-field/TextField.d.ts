import * as wml from '@quenk/wml';
import { TextFieldValues } from '.';
import { FormControlWidget } from '@package/self/control/form-control';
import { TextFieldAttrs } from '.';
/**
 * TextField
 */
export declare class TextField extends FormControlWidget<string, TextFieldAttrs> {
    view: wml.View;
    values: TextFieldValues;
    value(): string;
}
