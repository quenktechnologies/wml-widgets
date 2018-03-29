import * as wml from '@quenk/wml';
import { FormControlWidget } from '@package/wml-widgets/control/form-control';
import { SelectAttrs, Option } from '.';
/**
 * Select provides a dropdown list for selecting items.
 *
 * Note: Currently this relies on the native select but this
 * is likely to change in the future. Use the native <select>
 * directly if you must have that.
 */
export declare class Select extends FormControlWidget<string, SelectAttrs> {
    view: wml.View;
    values: {
        root: {
            id: string;
            class: string;
        };
        label: {
            id: string;
            text: string;
        };
        select: {
            id: string;
            name: string;
            class: string;
            value: string;
            disabled: boolean;
            readOnly: boolean;
            options: Option[];
            placeholder: string;
            optValue: (o: Option) => string;
            optLabel: (o: Option) => string;
            isSelected: (s: string) => boolean;
            onChange: (e: Event) => void;
        };
        help: {
            id: string;
            success: string;
            error: string;
            warning: string;
        };
    };
    value(): string;
}
