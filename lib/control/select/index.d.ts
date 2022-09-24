import * as views from './wml/select';
import { View } from '@quenk/wml';
import { Maybe } from '@quenk/noni/lib/data/maybe';
import { Message } from '../feedback';
import { FormControlAttrs, AbstractFormControl } from '../form';
import { Event as ControlEvent } from '../';
import { TermChangedEvent, ItemSelectedEvent, Stringifier, NoItemsTemplate, ItemTemplate } from '../search';
export { Stringifier, ItemTemplate, NoItemsTemplate, TermChangedEvent, ItemSelectedEvent };
export declare const SELECT = "ww-select";
/**
 * CommonSelectAttrs
 */
export interface CommonSelectAttrs<V> extends FormControlAttrs<V> {
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
      * inputClassName is the class list for the input.
      */
    inputClassName?: string;
    /**
     * placeholder text for the input.
     */
    placeholder?: string;
    /**
     * readOnly
     */
    readOnly?: boolean;
    /**
     * disabled
     */
    disabled?: boolean;
    /**
     * block
     */
    block?: boolean;
    /**
     * stringifier turns the value to a string.
     */
    stringifier?: Stringifier<V>;
    /**
     * onSearch handler.
     */
    onSearch?: (e: TermChangedEvent) => void;
}
/**
 * SelectAttrs
 */
export interface SelectAttrs<V> extends CommonSelectAttrs<V> {
    /**
     * onChange handler.
     */
    onChange?: (e: ItemChangedEvent<V>) => void;
    /**
     * onUnset handler.
     */
    onUnset?: (e: ItemUnsetEvent) => void;
}
/**
 * ItemChangedEvent
 */
export declare class ItemChangedEvent<V> extends ControlEvent<V> {
}
/**
 * ItemUnsetEvent
 */
export declare class ItemUnsetEvent extends ControlEvent<undefined> {
    name: string;
    constructor(name: string);
}
/**
 * RootSection
 */
export declare class RootSection<V> {
    attrs: CommonSelectAttrs<V>;
    constructor(attrs: CommonSelectAttrs<V>);
    wml: {
        id: string;
    };
    id: string;
    className: string;
}
/**
 * ControlSection
 */
export declare class ControlSection {
    constructor();
    wml: {
        id: string;
    };
}
/**
 * MessagesSection
 */
export declare class MessagesSection<V> {
    attrs: FormControlAttrs<V>;
    constructor(attrs: FormControlAttrs<V>);
    wml: {
        id: string;
    };
    text: string;
}
/**
 * LabelSection
 */
export declare class LabelSection<V> {
    attrs: FormControlAttrs<V>;
    constructor(attrs: FormControlAttrs<V>);
    id: string;
    text: string;
}
/**
 * InputSection
 */
export declare class InputSection {
    attrs: object;
    constructor(attrs: object);
    wml: {
        id: string;
    };
}
/**
 * SearchSection
 */
export declare class SearchSection<V> {
    attrs: CommonSelectAttrs<V>;
    close: () => void;
    onSelect: (e: ItemSelectedEvent<V>) => void;
    constructor(attrs: CommonSelectAttrs<V>, close: () => void, onSelect: (e: ItemSelectedEvent<V>) => void);
    wml: {
        id: string;
    };
    name: string;
    className: string;
    placeholder: string;
    block: boolean;
    value: NonNullable<V> | undefined;
    readOnly: boolean | undefined;
    disabled: boolean | undefined;
    itemTemplate: ItemTemplate<V> | undefined;
    noItemsTemplate: View | undefined;
    stringifier: Stringifier<V> | undefined;
    onSearch: (e: TermChangedEvent) => void;
}
/**
 * Select provides an control for selecting an item from a
 * list.
 */
export declare class Select<V> extends AbstractFormControl<V, SelectAttrs<V>> {
    view: views.Main<V>;
    values: {
        root: RootSection<V>;
        control: ControlSection;
        messages: MessagesSection<V>;
        label: LabelSection<V>;
        input: InputSection;
        search: SearchSection<V>;
        tag: {
            className: string;
            value: Maybe<V>;
            disabled: boolean;
            isSet: () => boolean;
            getText: () => string;
            dismiss: () => void;
        };
    };
    open(): Select<V>;
    close(): Select<V>;
    setMessage(msg: Message): Select<V>;
    removeMessage(): Select<V>;
    /**
     * update the Select with new item options to
     * present to the user.
     */
    update(results: V[]): Select<V>;
}
/**
 * open helper.
 *
 * Invokes the open method on the Search widget.
 */
export declare const open: <V>(view: View, id: string) => void;
/**
 * close helper.
 *
 * Invokes the close method on the Search widget.
 */
export declare const close: <V>(view: View, id: string) => void;
/**
 * update helper.
 *
 * Invokes the update method on the Search widget.
 */
export declare const update: <V>(view: View, id: string, results: V[]) => void;
