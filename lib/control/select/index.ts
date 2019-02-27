import * as views from './wml/select';
import { Fun } from '@quenk/wml';
import { Menu } from '../../menu/menu';
import { concat, getById } from '../../util';
import { FeedbackControlAttrs, AbstractFeedbackControl } from '../feedback';
import { FormControlAttrs } from '../form';
import { TermChangedEvent } from '../search';
import { getId, getClassName } from '../../';
import { Event as ControlEvent, getName } from '../';
import { Search } from '../search';

export { TermChangedEvent }

export const ESCAPE = 27;
export const INPUT_ID = 'input';

///classNames:begin
export const SELECT = 'ww-select';
///classNames:end

/**
 * ItemContentTemplate for rending the content of a single search result.
 */
export type ItemContentTemplate<V>
    = (s: Select<V>) => (option: V) => (index: number) => Fun
    ;

/**
 * EmpFun for rendering when there are no results.
 */
export type NoItemsTemplate<V> = (s: Select<V>) => Fun;

export interface SelectAttrs<V>
    extends FormControlAttrs<V>,
    FeedbackControlAttrs<V> {

    /**
     * itemContentTemplate if specified will be used to render each
     * result item.
     */
    itemContentTemplate?: ItemContentTemplate<V>,

    /**
     * noItemsTemplate for rendering the lack of search results.
     */
    noItemsTemplate?: NoItemsTemplate<V>,

    /**
      * inputClassName is the class list for the input.
      */
    inputClassName?: string,

    /**
     * placeholder text for the input.
     */
    placeholder?: string,

    /**
     * readOnly
     */
    readOnly?: boolean,

    /**
     * options to initialize the dropdown list with.
     * These options are displayed by default when
     * the input gains focused.
     */
    options?: V[],

    /**
     * stringifier turns the value to a string.
     */
    stringifier?: (v: V) => string

    /**
     * onChange handler.
     */
    onChange?: (e: ItemChangedEvent<V>) => void;

    /**
     * onSearch handler.
     */
    onSearch?: (e: TermChangedEvent) => void;

}

/**
 * ItemChangedEvent
 */
export class ItemChangedEvent<V> extends ControlEvent<V> { }

/* *
 * Autocomplate provides an input with a dropdown menu that allows
 * the user to search and select form a list of options.
 */
export class Select<V>
    extends AbstractFeedbackControl<V, SelectAttrs<V>> {

    view: views.Main<V> = new views.Main(this);

    values = {

        root: {

            wml: {

                id: 'root'

            },

            id: getId(this.attrs),

            className: concat(SELECT, getClassName(this.attrs)),

        },

        control: {

            wml: {

                id: 'root'

            }

        },

        messages: {

            wml: {

                id: 'message'

            }

        },

        input: {

            wml: {

                id: 'input'

            }

        },

        menu: {

            wml: {

                id: 'menu'

            },
            hide: true,
            options: <V[]>(this.attrs.ww && this.attrs.ww.options) || []


        },

        label: {

            id: getName(this.attrs),

            text: (this.attrs.ww && this.attrs.ww.label) ?
                this.attrs.ww.label : ''

        },
        search: {

            wml: {

                id: 'search'

            },
            name: getName(this.attrs),

            className: (this.attrs.ww && this.attrs.ww.inputClassName) ?
                this.attrs.ww.inputClassName : '',

            placeholder: (this.attrs.ww && this.attrs.ww.placeholder) ?
                this.attrs.ww.placeholder : '',

            readOnly: (this.attrs.ww && this.attrs.ww.readOnly),

            onFocus: () => {

                if (this.values.menu.options.length > 0)
                    this.update(this.values.menu.options);

            },

            onSearch: (this.attrs.ww && this.attrs.ww.onSearch) ?
                this.attrs.ww.onSearch : () => { },

            onEscape: () => this.close(),


        },
        item: {

            itemContentTemplate: (): ItemContentTemplate<V> =>
                (this.attrs.ww && this.attrs.ww.itemContentTemplate) ?
                    this.attrs.ww.itemContentTemplate : views.itemContentTemplate,

            noItemsTemplate: (): NoItemsTemplate<V> =>
                (this.attrs.ww && this.attrs.ww.noItemsTemplate) ?
                    this.attrs.ww.noItemsTemplate : views.noItemsTemplate,

            stringify: (this.attrs.ww && this.attrs.ww.stringifier) ?
                this.attrs.ww.stringifier : (v: V) => ('' + v),

            click: (index: number | string) => {

                let selected = this.values.menu.options[Number(index)];

                this.close();

                if (this.attrs.ww && this.attrs.ww.onChange)
                    this.attrs.ww.onChange(new ItemChangedEvent(
                        '' + this.attrs.ww.name, selected));

                getById<Search>(this.view, this.values.search.wml.id)
                    .map((s: Search) => s.set(this.values.item.stringify(selected)));

            }

        }

    }

    handleEvent(e: Event): void {

        getById<HTMLElement>(this.view, this.values.root.wml.id)
            .map((root: HTMLElement) => {

                if (!document.body.contains(root))
                    document.removeEventListener('click', this);

                if ((!root.contains(<Node>e.target)))
                    this.close();

            });

    }

    open(): Select<V> {

        getById<Menu>(this.view, this.values.menu.wml.id)
            .map((m: Menu) => m.show());

        return this;

    }

    close(): Select<V> {

        getById<Menu>(this.view, this.values.menu.wml.id)
            .map((m: Menu) => m.hide());

        return this;

    }

    /**
     * update the Select with new item options to
     * present to the user.
     */
    update(results: V[]): Select<V> {

        this.values.menu.options = results;

        window.removeEventListener('click', this);
        window.addEventListener('click', this);

        getById<Menu>(this.view, this.values.menu.wml.id)
            .map((m: Menu) => m.setContent(views.results(this)(this.view)));

        return this;

    }

}

