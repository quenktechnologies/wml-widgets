import { View } from '@quenk/wml';
import { FormControlAttrs, AbstractFormControl } from '../form';
import { Stringifier, TermChangedEvent, ItemSelectedEvent, NoItemsTemplate, ItemTemplate } from '../search';
import { Event as ControlEvent } from '../';
import { Message } from '../feedback';
import { DismissEvent } from '../tag';
export { NoItemsTemplate, ItemTemplate, TermChangedEvent };
export declare const MULTI_SELECT = "ww-multi-select";
export declare const MULTI_SELECT_CONTENT = "ww-multi-select__content";
export declare const MULTI_SELECT_INPUT = "ww-multi-select__input";
export declare const MULTI_SELECT_TAG = "ww-multi-select__tag";
export declare const DEFAULT_INPUT_WIDTH = 50;
export declare const DEFAULT_FONT_INCREMENT = 7;
/**
 * MutliselectAttrs
 */
export interface MutliselectAttrs<V> extends FormControlAttrs<V[]> {
    /**
     * block flag
     */
    block?: boolean;
    /**
     * inputWidth indicates how wide the invisible input should be initially.
     */
    inputWidth?: number;
    /**
     * fontIncrement is used when expanding the input as the user types.
     */
    fontIncrement?: number;
    /**
     * itemTemplate if specified will be used to render each
     * result item.
     */
    itemTemplate?: ItemTemplate<V>;
    /**
     * noItemsTemplate for rendering the lack of search results.
     */
    noItemsTemplate?: NoItemsTemplate;
    /**
     * onSearch receives events from the SearchControl.
     */
    onSearch?: (s: TermChangedEvent) => void;
    /**
     * onChange handler.
     */
    onChange?: (e: ItemsChangedEvent<V>) => void;
    /**
     * stringifier
     */
    stringifier?: Stringifier<V>;
}
/**
 * ItemsChangedEvent
 */
export declare class ItemsChangedEvent<V> extends ControlEvent<V[]> {
}
/**
 * MultiSelect
 */
export declare class MultiSelect<V> extends AbstractFormControl<V[], MutliselectAttrs<V>> {
    view: View;
    values: {
        root: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
        };
        control: {
            wml: {
                id: string;
            };
        };
        label: {
            wml: {
                id: string;
            };
            text: string;
        };
        search: {
            wml: {
                id: string;
            };
            block: true | undefined;
            itemTemplate: ItemTemplate<V> | undefined;
            noItemsTemplate: import("@quenk/wml").Fun | undefined;
            onSearch: (evt: TermChangedEvent) => void;
            onSelect: ({ value }: ItemSelectedEvent<V>) => void;
        };
        messages: {
            wml: {
                id: string;
            };
            text: string;
        };
        content: {
            className: string;
            onfocus: () => MultiSelect<V>;
        };
        tags: {
            className: string;
            value: V[];
            has: () => boolean;
            getText: Stringifier<V>;
            onDismiss: (e: DismissEvent) => void;
        };
        input: {
            wml: {
                id: string;
            };
            className: string;
            name: string;
            inputWidth: number;
            fontIncrement: number;
            onSearch: (e: TermChangedEvent) => void;
        };
        menu: {
            wml: {
                id: string;
            };
            name: string;
            block: boolean;
            onSelect: (e: ItemSelectedEvent<V>) => void;
            itemTemplate: ItemTemplate<V> | undefined;
            noItemsTemplate: import("@quenk/wml").Fun | undefined;
            stringifier: Stringifier<V> | undefined;
        };
    };
    /**
     * @private
     */
    fireChange(): void;
    /**
     * @private
     */
    grow(n: number): void;
    /**
     * @private
     */
    redraw(): MultiSelect<V>;
    setMessage(msg: Message): MultiSelect<V>;
    removeMessage(): MultiSelect<V>;
    update(results: V[]): MultiSelect<V>;
    open(): MultiSelect<V>;
    close(): MultiSelect<V>;
    focus(): MultiSelect<V>;
    /**
     * push a value onto the end of the internal stack.
     */
    push(value: V): MultiSelect<V>;
}
