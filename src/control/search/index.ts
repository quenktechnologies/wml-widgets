import * as views from './wml/search';
import { View } from '@quenk/wml';
import { getBlockClassName } from '../../content/orientation';
import { concat, getById } from '../../util';
import {
    Stringifier,
    ItemTemplate,
    NoItemsTemplate,
    ResultsMenu,
    ItemSelectedEvent
} from '../results-menu';
import { getId, getClassName } from '../../';
import { ControlAttrs, Event, AbstractControl } from '../';

export { ItemSelectedEvent }

/**
 * ESCAPE key code.
 */
export const ESCAPE = 27;

///classNames:begin
export const SEARCH = 'ww-search';
export const SEARCH_INPUT = 'ww-search__input';
///classNames:end

/**
 * SearchAttrs
 */
export interface SearchAttrs<V> extends ControlAttrs<V> {

    /**
     * onSearch handler.
     */
    onSearch?: (e: TermChangedEvent) => void

    /**
     * onEscape handler.
     */
    onEscape?: () => void,

    /**
     * onFocus handler.
     */
    onFocus?: (e: FocusGainedEvent) => void,

    /**
     * onSelect is applied when the user selects an item.
     */
    onSelect?: (e: ItemSelectedEvent<V>) => void,

    /**
     * stringifier turns item values into a string so that 
     * they can be used used as labels.
     */
    stringifier?: Stringifier<V>,

    /**
     * itemTemplate if specified will be used to render each
     * result item.
     */
    itemTemplate?: ItemTemplate<V>,

    /**
     * noItemsTemplate for rendering the lack of search results.
     */
    noItemsTemplate?: NoItemsTemplate,

    /**
     * placeholder
     */
    placeholder?: string,

    /**
     * readOnly 
     */
    readOnly?: boolean,

    /**
     * block flag
     */
    block?: boolean,

    /**
     * term value to display
     */
    term?: string

}

/**
 * TermChangedEvent signals the search term has changed.
 */
export class TermChangedEvent extends Event<string>{ }

/**
 * FocusGainedEvent singlas the user as given focus to the search.
 */
export class FocusGainedEvent {

    constructor(public name: string) { }

}

/** 
 * Search provides an input that can be used in the ui for a search engine.
 */
export class Search<V> extends AbstractControl<V, SearchAttrs<V>> {

    view: View = new views.Main(this);

    values = {

        root: {

            wml: {

                id: 'root'

            },

            id: getId(this.attrs),

            className: concat(SEARCH,
                getClassName(this.attrs),
                getBlockClassName(this.attrs))

        },

        input: {

            wml: {

                id: 'input'

            },

            className: SEARCH_INPUT,

            placeholder: (this.attrs.ww && this.attrs.ww.placeholder) ?
                this.attrs.ww.placeholder : '',

            readOnly: (this.attrs.ww && this.attrs.ww.readOnly) || null,

            value: (this.attrs.ww && this.attrs.ww.term) ?
                this.attrs.ww.term :
                (this.attrs.ww &&
                    this.attrs.ww.stringifier &&
                    this.attrs.ww.value) ?
                    this.attrs.ww.stringifier(this.attrs.ww.value) : '',

            onfocus: (e: KeyboardEvent) => {

                let target = <HTMLInputElement>e.target;

                if (this.attrs.ww && this.attrs.ww.onFocus)
                    this.attrs.ww.onFocus(new FocusGainedEvent(
                        this.attrs.ww && this.attrs.ww.name || ''));

                target.value = target.value;

            },
            onkeydown: (e: KeyboardEvent) => {

                if (e.keyCode === ESCAPE) {

                    if (this.attrs.ww && this.attrs.ww.onEscape)
                        this.attrs.ww.onEscape();

                } else {

                    if (this.attrs.ww && this.attrs.ww.onSearch) {

                        let name = '' + this.attrs.ww.name;
                        let value = (<HTMLInputElement>e.target).value;

                        this.attrs.ww.onSearch(new TermChangedEvent(name, value));

                    }

                }

            },
            onkeyup: (e: KeyboardEvent) => {

                if (e.keyCode === ESCAPE)
                    (<HTMLInputElement>e.target).blur();

            },
            oninput: (e: KeyboardEvent) => {

                //For compatability reasons
                (<HTMLInputElement>e.target).oninput = null;
                this.values.input.onkeydown(e);

            }

        },
        menu: {

            wml: {

                id: 'menu'

            },

            name: (this.attrs.ww && this.attrs.ww.name) ?
                this.attrs.ww.name : '',

            block: (this.attrs.ww && this.attrs.ww.block) ?
                this.attrs.ww.block : false,

            options: <V[]>[],

            onSelect: (e: ItemSelectedEvent<V>) => {

                this.close();

                if (this.attrs.ww && this.attrs.ww.onSelect)
                    this.attrs.ww.onSelect(e);

            },
            itemTemplate: (this.attrs.ww && this.attrs.ww.itemTemplate) ?
                this.attrs.ww.itemTemplate : undefined,

            noItemsTemplate: (this.attrs.ww && this.attrs.ww.noItemsTemplate) ?
                this.attrs.ww.noItemsTemplate : undefined,

            stringifier: (this.attrs.ww && this.attrs.ww.stringifier) ?
                this.attrs.ww.stringifier : undefined

        }

    }

    set(value: string): Search<V> {

        getById<HTMLInputElement>(this.view, this.values.root.wml.id)
            .map((e: HTMLInputElement) => { e.value = value });

        return this;

    }

    /**
     * update the Select with new item options to
     * present to the user.
     */
    update(results: V[]): Search<V> {

        let mMenu = getById<ResultsMenu<V>>(this.view, this.values.menu.wml.id);

        if (mMenu.isJust())
            mMenu.get().update(results);

        return this;

    }

    /**
     * open the results menu.
     */
    open(): Search<V> {

        getById<ResultsMenu<V>>(this.view, this.values.menu.wml.id)
            .map((m: ResultsMenu<V>) => m.open());

        return this;

    }

    /**
     * close the results menu.
     */
    close(): Search<V> {

        getById<ResultsMenu<V>>(this.view, this.values.menu.wml.id)
            .map((m: ResultsMenu<V>) => m.close());

        return this;

    }


}
