import { View } from '@quenk/wml';
import { ControlAttrs, Event, AbstractControl } from '../../';
export declare const NATIVE_SELECT = "ww-native-select";
/**
 * Option provides needed information for the Select to generate its
 * dropdown lost.
 */
export interface Option<V> {
    /**
     * title of the option.
     */
    title: string;
    /**
     * value used when the option is selected.
     */
    value: V;
}
/**
 * SelectAttrs
 */
export interface SelectAttrs<V> extends ControlAttrs<V> {
    /**
     * options available for the Select.
     */
    options: Option<V>[];
    /**
     * onChange handler.
     */
    onChange: (e: SelectionChangedEvent<V>) => void;
}
/**
 * SelectionChangedEvent indicates the user's selection
 * has changed.
 */
export declare class SelectionChangedEvent<V> extends Event<V> {
}
/**
 * Values available to the Select's view.
 */
export declare class Values<V> {
    self: Select<V>;
    options: Option<V>[];
    id: string;
    onchange: (e: KeyboardEvent) => void;
    selected: number;
    className: string;
    name: string;
    instruction: string;
    constructor(self: Select<V>, options: Option<V>[], id?: string, onchange?: (e: KeyboardEvent) => void, selected?: number, className?: string, name?: string, instruction?: string);
}
/**
 * Select provides a native <select> element with it's
 * event(s) converted to control events.
 */
export declare class Select<V> extends AbstractControl<V, SelectAttrs<V>> {
    view: View;
    values: Values<V>;
}
/**
 * dispatchChange when the selected item changes.
 */
export declare const dispatchChange: <V>(self: Select<V>) => (e: KeyboardEvent) => void;
