import { View } from '@quenk/wml';
import { Size } from '../../content/size';
import { AbstractFeedbackControl } from '../feedback';
import { ControlAttrs, Event } from '../';
export declare const DROPLIST = "ww-droplist";
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
 * DropListAttrs
 */
export interface DropListAttrs<V> extends ControlAttrs<V> {
    /**
     * block display
     */
    block?: boolean;
    /**
     * size
     */
    size?: Size;
    /**
     * options available for the Select.
     */
    options: Option<V>[];
    /**
     * onChange handler.
     */
    onChange?: (e: SelectionChangedEvent<V>) => void;
}
/**
 * SelectionChangedEvent indicates the user's selection
 * has changed.
 */
export declare class SelectionChangedEvent<V> extends Event<V> {
}
/**
 * Droplist provides a native <select> element with it's
 * event(s) converted to control events.
 */
export declare class Droplist<V> extends AbstractFeedbackControl<V, DropListAttrs<V>> {
    view: View;
    values: {
        control: {
            wml: {
                id: string;
            };
        };
        messages: {
            wml: {
                id: string;
            };
        };
        id: string;
        className: string;
        name: string;
        options: Option<V>[];
        onchange: (e: KeyboardEvent) => void;
        selected: number;
        instruction: string;
    };
}
