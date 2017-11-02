import * as wml from '@quenk/wml';
import * as names from '@package/self/common/names';
import * as views from './wml/search-stack';
import { FormControl } from '@package/self/control';
import { Autocomplete, TermChangedEvent, ItemSelectedEvent } from '@package/self/control/autocomplete';
import { Stack, StackChangedEvent } from '@package/self/control/stack';
import { SearchStackAttrs } from './SearchStackAttrs';

/**
 * SearchStack
 */
export class SearchStack<V> extends FormControl<V[], SearchStackAttrs<V>> {

    view: wml.View = new views.Main(this);

    values = {

        id: {

            root: 'root',
            input: 'button',
            search: 'search',
            message: 'message'

        },

        root: {

            id: 'root',
            class: names.SEARCH_STACK

        },
        help: {

            id: 'help'


        },
        search: {

            id: 'search',
            name: this.attrs.ww.name,
            value: '',
            onSearch: (evt: TermChangedEvent) =>
            { if (this.attrs.ww.onSearch) this.attrs.ww.onSearch(evt) },
            onSelect: ({ value }: ItemSelectedEvent<V>) => this.push(value)

        },
        stack: {

            id: 'stack',
            name: this.attrs.ww.name,
            value: this.attrs.ww.value,
            decorator: this.attrs.ww.decorator ? this.attrs.ww.decorator : (v: V) => String(v),
            onChange: (evt: StackChangedEvent<V>) => this.delegate.onChange(evt)

        }
    };

    /**
     * update the list of available options displayed to the user.
     */
    update(list: V[]): SearchStack<V> {

        this
            .view
            .findById(this.values.search.id)
            .map((s: Autocomplete<V>) => s.update(list));

        return this;

    }

    /**
     * push a value onto the stack.
     */
    push(v: V): SearchStack<V> {

        this
            .view
            .findById(this.values.stack.id)
            .map((s: Stack<V>) => s.push(v));

        return this;

    }

}
