import * as views from './wml/typeahead';
import { Message } from '../feedback';
import { AbstractFormControl } from '../form';
import { TermChangedEvent } from '../search';
import { TextChangedEvent } from '../text-field';
import { Stringifier, ItemTemplate, NoItemsTemplate, ItemSelectedEvent, CommonSelectAttrs, RootSection, ControlSection, MessagesSection, LabelSection, SearchSection } from '../select';
export { Stringifier, ItemTemplate, NoItemsTemplate, TermChangedEvent, TextChangedEvent, ItemSelectedEvent };
export declare const TYPEAHEAD = "ww-typeahead";
/**
 * TypeaheadAttrs
 */
export interface TypeaheadAttrs<V> extends CommonSelectAttrs<V> {
    /**
     * onChange handler.
     */
    onChange?: (e: TextChangedEvent) => void;
}
/**
 * Typeahead provides an text input field that can suggests values
 * as the user types.
 */
export declare class Typeahead<V> extends AbstractFormControl<V, TypeaheadAttrs<V>> {
    view: views.Main<V>;
    values: {
        root: RootSection<V>;
        control: ControlSection;
        messages: MessagesSection<V>;
        label: LabelSection<V>;
        search: SearchSection<V>;
    };
    open(): Typeahead<V>;
    close(): Typeahead<V>;
    setMessage(msg: Message): Typeahead<V>;
    removeMessage(): Typeahead<V>;
    update(results: V[]): Typeahead<V>;
}
