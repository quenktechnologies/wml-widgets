import { View } from '@quenk/wml';
import { Size } from '../../content/size';
import { ItemSelectedEvent, ItemTemplate, NoItemsTemplate, Stringifier } from '../results-menu';
import { ControlAttrs, AbstractControl } from '../';
export { ItemTemplate, NoItemsTemplate, ItemSelectedEvent };
export declare const DROP_LIST = "ww-drop-list";
/**
 * Option
 */
export interface Option<V> {
    /**
     * label
     */
    label: string;
    /**
     * value
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
     * placeholder
     */
    placeholder?: string;
    /**
     * options available for selection.
     */
    options?: Option<V>[];
    /**
     * onSelect is applied when the user selects an item.
     */
    onSelect?: (e: ItemSelectedEvent<V>) => void;
    /**
     * stringifier
     */
    stringifier?: Stringifier<Option<V>>;
    /**
     * itemTemplate if specified will be used to render each
     * result item.
     */
    itemTemplate?: ItemTemplate<Option<V>>;
    /**
     * noItemsTemplate for rendering the lack of search results.
     */
    noItemsTemplate?: NoItemsTemplate;
}
/**
 * DropList provides a control for making a selection from a list of choices.
 */
export declare class DropList<V> extends AbstractControl<V, DropListAttrs<V>> {
    view: View;
    values: {
        id: string;
        className: string;
        name: string;
        value: V | undefined;
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
        display: {
            placeholder: () => string | undefined;
            onClick: () => void;
        };
        menu: {
            wml: {
                id: string;
            };
            name: string;
            block: boolean;
            hidden: boolean;
            results: Option<V>[];
            onSelect: (e: ItemSelectedEvent<Option<V>>) => void;
            itemTemplate: ItemTemplate<Option<V>> | undefined;
            noItemsTemplate: import("@quenk/wml").Fun | undefined;
            stringifier: Stringifier<Option<V>>;
        };
    };
    /**
     * open the results menu.
     */
    open(): DropList<V>;
    /**
     * close the results menu.
     */
    close(): DropList<V>;
    /**
     * toggle the results menu.
     */
    toggle(): DropList<V>;
}
