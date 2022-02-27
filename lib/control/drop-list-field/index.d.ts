import { View } from '@quenk/wml';
import { Message } from '../feedback';
import { ItemSelectedEvent, ItemTemplate, NoItemsTemplate, Stringifier } from '../results-menu';
import { ItemChangedEvent } from '../select';
import { FormControlAttrs, AbstractFormControl } from '../form';
import { Option } from '../drop-list';
export { ItemTemplate, NoItemsTemplate, ItemChangedEvent };
export declare const DROP_LIST_FIELD = "ww-drop-list-field";
/**
 * DropListFieldAttrs
 */
export interface DropListFieldAttrs<V> extends FormControlAttrs<V> {
    /**
     * placeholder
     */
    placeholder?: string;
    /**
     * disabled
     */
    disabled?: boolean;
    /**
     * options available for selection.
     */
    options?: Option<V>[];
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
    /**
     * onChange is applied when the user selects an item.
     */
    onChange?: (e: ItemChangedEvent<V>) => void;
}
/**
 * DropListField
 */
export declare class DropListField<V> extends AbstractFormControl<V, DropListFieldAttrs<V>> {
    view: View;
    values: {
        root: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
        };
        messages: {
            wml: {
                id: string;
            };
            text: string;
        };
        label: {
            id: string;
            text: string;
        };
        control: {
            wml: {
                id: string;
            };
            name: string;
            className: string;
            block: boolean;
            placeholder: string | undefined;
            disabled: boolean | undefined;
            value: V | undefined;
            options: Option<V>[];
            stringifier: Stringifier<Option<V>> | undefined;
            itemTemplate: ItemTemplate<Option<V>> | undefined;
            noItemsTemplate: View | undefined;
            onSelect: (e: ItemSelectedEvent<V>) => void;
        };
    };
    setMessage(msg: Message): DropListField<V>;
    removeMessage(): DropListField<V>;
}
