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
import { ControlAttrs, Event, AbstractControl, getName } from '../';

export {
    Stringifier,
    ItemTemplate,
    NoItemsTemplate,
    ItemSelectedEvent
}

/**
 * ESCAPE key code.
 */
export const ESCAPE = 27;

///classNames:begin
export const SEARCH = 'ww-search';
export const SEARCH_INPUT = 'ww-search__input';
///classNames:end

/**
 * CommonAttrs
 */
export interface CommonAttrs<V> extends ControlAttrs<V> {

    /**
     * onSearch handler.
     */
    onSearch?: (e: TermChangedEvent) => void

    /**
     * onFocus handler.
     */
    onFocus?: (e: FocusGainedEvent) => void,

    /**
     * onBlur handler
     */
    onBlur?: (e: FocusLostEvent) => void,

    /**
     * stringifier turns item values into a string so that 
     * they can be used used as labels.
     */
    stringifier?: Stringifier<V>,

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

}

/**
 * InputAttrs
 */
export interface InputAttrs<V> extends CommonAttrs<V> {

    /**
     * size of the input.
     */
    size?: number,

    /**
     * onEscape handler.
     */
    onEscape?: (e: EscapeEvent) => void,

}

/**
 * SearchAttrs
 */
export interface SearchAttrs<V> extends CommonAttrs<V> {

    /**
     * onSelect is applied when the user selects an item.
     */
    onSelect?: (e: ItemSelectedEvent<V>) => void,

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
     * term value to display
     */
    term?: string

}

/**
 * TermChangedEvent signals the search term has changed.
 */
export class TermChangedEvent extends Event<string>{ }

/**
 * FocusGainedEvent signals the user as given focus to the control.
 */
export class FocusGainedEvent {

    constructor(public name: string) { }

}

/**
 * FocusLostEvent signals the user has removed focus from the control.
 */
export class FocusLostEvent {

    constructor(public name: string) { }

}

/**
 * EscapeEvent signals the user has pressed the escape key while typing.
 */
export class EscapeEvent {

    constructor(public name: string) { }

}

/**
 * Input provides the input part of a Search control.
 *
 * This is here mostly for code re-use.
 */
export class Input
    extends
    AbstractControl<string, InputAttrs<string>> {

    view: View = new views.InputView(this);

    values = {

        wml: { id: 'root' },

        className: concat(SEARCH_INPUT, getClassName(this.attrs)),

        placeholder: (this.attrs.ww && this.attrs.ww.placeholder) ?
            this.attrs.ww.placeholder : '',

        readOnly: (this.attrs.ww && this.attrs.ww.readOnly) || undefined,

        autocomplete: 'do not enable please',

        size: String((this.attrs.ww && this.attrs.ww.size) ?
            this.attrs.ww.size : 20),

        value: (this.attrs.ww && this.attrs.ww.value) ?
            this.attrs.ww.value : '',

        onfocus: (e: KeyboardEvent) => {

            let target = <HTMLInputElement>e.target;

            if (this.attrs.ww && this.attrs.ww.onFocus)
                this.attrs.ww.onFocus(new FocusGainedEvent(
                    this.attrs.ww && this.attrs.ww.name || ''));

            target.value = target.value;

        },
        onkeydown: (e: KeyboardEvent) => {

            if (e.keyCode !== ESCAPE)
                if (this.attrs.ww && this.attrs.ww.onSearch) {

                    let name = '' + this.attrs.ww.name;
                    let value = (<HTMLInputElement>e.target).value;

                    this.attrs.ww.onSearch(new TermChangedEvent(name, value));

                }

        },
        onkeyup: (e: KeyboardEvent) => {

            if (e.keyCode === ESCAPE)
                if (this.attrs.ww && this.attrs.ww.onEscape)
                    this.attrs.ww.onEscape(
                        new EscapeEvent(this.attrs.ww.name || ''));

        },
        oninput: (e: KeyboardEvent) => {

            //For compatability reasons
            (<HTMLInputElement>e.target).oninput = null;
            this.values.onkeydown(e);

        },
        onblur: () => {

            if (this.attrs.ww && this.attrs.ww.onBlur)
                this.attrs.ww.onBlur(new FocusLostEvent(
                    this.attrs.ww && this.attrs.ww.name || ''));

        }

    }

    /**
     * focus steals user focus to the Input.
     */
    focus(): Input {

        getInput(this).map(i => i.focus());
        return this;

    }


    /**
     * setSize sets the size of the input.
     */
    setSize(n: number): Input {

        this.values.size = String(n);

        getInput(this).map(i => i.setAttribute('size', String(n)));

        return this;

    }

    /**
     * getSize returns the size of the (internally tracked) size
     * of the Input. 
     */
    getSize(): number {

        return Number(this.values.size);

    }

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

            name: getName(this.attrs),

            placeholder: (this.attrs.ww && this.attrs.ww.placeholder) ?
                this.attrs.ww.placeholder : '',

            readOnly: (this.attrs.ww && this.attrs.ww.readOnly) || undefined,

            value: (this.attrs.ww && this.attrs.ww.term) ?
                this.attrs.ww.term :
                (this.attrs.ww &&
                    this.attrs.ww.stringifier &&
                    this.attrs.ww.value) ?
                    this.attrs.ww.stringifier(this.attrs.ww.value) : '',

            onFocus: this.attrs.ww && this.attrs.ww.onFocus || undefined,

            onSearch: (this.attrs.ww && this.attrs.ww.onSearch) ?
                this.attrs.ww.onSearch : undefined,

            onEscape: () => this.close(),

            onBlur: (this.attrs.ww && this.attrs.ww.onBlur) ?
                this.attrs.ww.onBlur : undefined

        },
        menu: {

            wml: {

                id: 'menu'

            },

            name: (this.attrs.ww && this.attrs.ww.name) ?
                this.attrs.ww.name : '',

            block: (this.attrs.ww && this.attrs.ww.block) ?
                this.attrs.ww.block : false,

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

        updateMenu(this.view, this.values.menu.wml.id, results);
        return this;

    }

    /**
     * open the results menu.
     */
    open(): Search<V> {

        openMenu(this.view, this.values.menu.wml.id);
        return this;

    }

    /**
     * close the results menu.
     */
    close(): Search<V> {

        closeMenu(this.view, this.values.menu.wml.id);
        return this;

    }

}

const getInput = (i: Input) =>
    getById<HTMLInputElement>(i.view, i.values.wml.id);

/**
 * updateMenu will cause the menu to be displayed with new items.
 */
export const updateMenu = <V>(view: View, id: string, results: V[]): void => {

    let mMenu = getById<ResultsMenu<V>>(view, id);

    if (mMenu.isJust())
        mMenu.get().update(results);

}

/**
 * openMenu will cause the menu to be displayed with whatever contents
 * were previously set.
 */
export const openMenu = <V>(view: View, id: string): void => {

    getById<ResultsMenu<V>>(view, id)
        .map((m: ResultsMenu<V>) => m.open());

}

/**
 * closeMenu will cause the menu to no longer be displayed.
 */
export const closeMenu = <V>(view: View, id: string): void => {

    getById<ResultsMenu<V>>(view, id)
        .map((m: ResultsMenu<V>) => m.close());

}
