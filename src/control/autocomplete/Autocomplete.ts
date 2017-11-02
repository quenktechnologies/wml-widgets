import * as names from '@package/self/common/names';
import * as views from './wml/autocomplete';
import * as wml from '@quenk/wml';
import { Menu } from "@package/self/menu/Menu"
import { concat } from '@package/self/common/util';
import { SearchControl, ItemSelectedEvent, PopulatedFun, EmptyFun } from '@package/self/control/lurch';
import { AutocompleteAttrs } from './AutocompleteAttrs';

export const ESCAPE = 27;
export const INPUT_ID = 'input';

/** 
 * Autocomplate provides an input with a dropdown menu that allows
 * the user to search and select form a list of options.
 */
export class Autocomplete<V> extends SearchControl<V, AutocompleteAttrs<V>> {

    view: wml.View = new views.Main(this);

    template: { populated: PopulatedFun, empty: EmptyFun } = {

        populated: (this.attrs.ww.populated) ?
            this.attrs.ww.populated : views.populated,

        empty: (this.attrs.ww.empty) ?
            this.attrs.ww.empty : views.empty

    };

    values = {

        id: {

            root: 'root',
            input: 'input',
            menu: 'menu',
            message: 'mesage',

        },
        class: {

            root: '',
            input: ''

        },
        root: {

            id: 'root',
            class: concat(names.SEARCH, this.attrs.ww.class)

        },
        help: {

            id: 'help'

        },
        menu: {

            id: 'menu'

        },
        input: {

            id: 'input',

            class: this.attrs.ww.inputClass,

            placeholder: this.attrs.ww.placeholder ?
                this.attrs.ww.placeholder : null,

            onKeyDown: this.onKeyDown,

            onKeyUp: this.onKeyUp,

            onInput: this.onInput

        },
        search: {

            delay: this.attrs.ww.debounce ?
                this.attrs.ww.debounce : this.DEFAULT_DEBOUNCE_TIME,

            results: <V[]>[]

        },
        item: {

            template: this.template,

            stringify: this.attrs.ww.stringifier ?
                this.attrs.ww.stringifier : this.stringify,

            click: (index: number | string) => {

                this
                    .close()
                    .delegate
                    .onSelect(new ItemSelectedEvent(
                        this.attrs.ww.name, this.values.search.results[Number(index)]));

            }

        }

    }

    clear(): Autocomplete<V> {

        return this;

    }

    open(): Autocomplete<V> {

        this
            .view
            .findById(this.values.id.menu)
            .map((m: Menu) => m.show());

        return this;

    }

    close(): Autocomplete<V> {

        this
            .view
            .findById(this.values.id.menu)
            .map((m: Menu) => m.hide());

        return this;

    }

    update(results: V[]): Autocomplete<V> {

        this.values.search.results = results;

        this
            .view
            .findById(this.values.id.menu)
            .map((m: Menu) => m.setContent(new views.Results(this)).show());

        return this;

    }

}
