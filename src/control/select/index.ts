import * as views from './wml/select';
import { View, Template } from '@quenk/wml';
import { Menu } from '../menu';
import { concat } from '../../util';
import { FeedbackControlAttrs, GenericFeedbackControl } from '../feedback';
import { FormControlAttrs } from '../form';
import { TermChangedEvent } from '../search';
import { Event as ControlEvent } from '../';
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
    = (s: Select<V>) => (option: V) => (index: number) => Template
    ;

/**
 * EmpFun for rendering when there are no results.
 */
export type NoItemsTemplate<V> = (s: Select<V>) => Template;

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
      * inputClass is the class list for the input.
      */
    inputClass?: string,

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
     * native if true, will have the Select
     * behave similarly to a native select element.
     */

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
    extends GenericFeedbackControl<V, SelectAttrs<V>> {

    view: View = new views.Main(this);

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
            class: concat(SELECT, this.attrs.ww.class)
        },
        help: {

            id: 'message',
            success: this.attrs.ww.success,
            error: this.attrs.ww.error,
            warning: this.attrs.ww.warning

        },
        menu: {

            id: 'menu',
            hide: true,
            options: <V[]>(this.attrs.ww && this.attrs.ww.options) || []

        },
        label: {

            id: this.attrs.ww.name,
            text: this.attrs.ww.label || ''

        },
        search: {

            id: 'search',

          name: this.attrs.ww.name,

            class: this.attrs.ww.inputClass,

            placeholder: this.attrs.ww.placeholder ?
                this.attrs.ww.placeholder : null,

            readOnly: this.attrs.ww && this.attrs.ww.readOnly,

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
                this.attrs.ww.stringifier : (v: V) => String(v),

            click: (index: number | string) => {

                let selected = this.values.menu.options[Number(index)];

                this.close();

                if (this.attrs.ww && this.attrs.ww.onChange)
                    this.attrs.ww.onChange(new ItemChangedEvent(
                        this.attrs.ww.name, selected));

                this
                    .view
                    .findById(this.values.search.id)
                    .map((s: Search) => s.set(this.values.item.stringify(selected)));

            }

        }

    }

    handleEvent(e: Event): void {

        this
            .view
            .findById(this.values.root.id)
            .map((root: HTMLElement) => {

                if (!document.body.contains(root))
                    document.removeEventListener('click', this);

                if ((!root.contains(<Node>e.target)))
                    this.close();

            });

    }

    open(): Select<V> {

        this
            .view
            .findById(this.values.id.menu)
            .map((m: Menu) => m.show());

        return this;

    }

    close(): Select<V> {

        this
            .view
            .findById(this.values.id.menu)
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

        this
            .view
            .findById(this.values.id.menu)
            .map((m: Menu) => m.setContent(new views.Results(this)));

        return this;

    }

}

