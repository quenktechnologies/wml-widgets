import * as wml from '@quenk/wml';
import { TextFieldValues } from '.';
import { FormControl } from '@package/self/control';
import { TextFieldAttrs } from './TextFieldAttrs';
/**
 * TextField
 */
export declare class TextField extends FormControl<string, TextFieldAttrs> {
    view: wml.View;
    values: TextFieldValues;
}
