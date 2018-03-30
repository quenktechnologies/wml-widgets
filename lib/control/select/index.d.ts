import * as wml from '@quenk/wml';
import { FormControlWWAttrs } from '../../control/form-control';
export { Select } from './Select';
export { SelectionChangedEvent } from './SelectionChangedEvent';
/**
 * SelectAttrs
 */
export interface SelectAttrs extends wml.Attrs {
    ww: SelectWWAttrs;
}
/**
 * SelectWWAttrs
 */
export interface SelectWWAttrs extends FormControlWWAttrs<string> {
    options?: Option[];
    placeholder?: string;
}
/**
 * Option allowed for selects.
 */
export declare type Option = {
    label: string;
    value: string;
} | string;
