import * as views from './wml/typeahead';

import { getById } from '../../util';
import { Message } from '../feedback';
import { AbstractFormControl, removeMessage, setMessage } from '../form';
import { TermChangedEvent, Search } from '../search';
import { TextChangedEvent } from '../text-field';
import {
    Stringifier,
    ItemTemplate,
    NoItemsTemplate,
    ItemSelectedEvent,
    CommonSelectAttrs,
    RootSection,
    ControlSection,
    MessagesSection,
    LabelSection,
    SearchSection,
    open,
    close,
    update
} from '../select';

export {
    Stringifier,
    ItemTemplate,
    NoItemsTemplate,
    TermChangedEvent,
    TextChangedEvent,
    ItemSelectedEvent
};

///classNames:begin
export const TYPEAHEAD = 'ww-typeahead';
///classNames:end

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
export class Typeahead<V> extends AbstractFormControl<V, TypeaheadAttrs<V>> {
    view: views.Main<V> = new views.Main(this);

    values = {
        root: new RootSection(this.attrs),

        control: new ControlSection(),

        messages: new MessagesSection(this.attrs),

        label: new LabelSection(this.attrs),

        search: new SearchSection(
            this.attrs,
            () => this.close(),
            (e: ItemSelectedEvent<V>) => {
                this.close();

                let mSearch = getById<Search<V>>(
                    this.view,
                    this.values.search.wml.id
                );

                if (mSearch.isJust()) {
                    let s = mSearch.get();

                    let str = this.values.search.stringifier
                        ? this.values.search.stringifier(e.value)
                        : e.value + '';

                    s.set(str);

                    if (this.attrs && this.attrs.onChange)
                        this.attrs.onChange(
                            new TextChangedEvent('' + this.attrs.name, str)
                        );
                }
            }
        )
    };

    open(): Typeahead<V> {
        open(this.view, this.values.search.wml.id);
        return this;
    }

    close(): Typeahead<V> {
        close(this.view, this.values.search.wml.id);
        return this;
    }

    setMessage(msg: Message): Typeahead<V> {
        this.values.messages.text = msg;
        setMessage(this.view, this.values.messages.wml.id, msg);
        return this;
    }

    removeMessage(): Typeahead<V> {
        this.values.messages.text = '';
        removeMessage(this.view, this.values.messages.wml.id);
        return this;
    }

    update(results: V[]): Typeahead<V> {
        update(this.view, this.values.search.wml.id, results);
        return this;
    }
}
