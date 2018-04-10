import * as views from './wml/search';
import { View } from '@quenk/wml';
import { concat } from '../../util';
import { ControlAttrs, Event, GenericControl } from '../';

/**
 * ESCAPE key code.
 */
export const ESCAPE = 27;

///className:begin
export const SEARCH = 'ww-search form-control';
///className:end

/**
 * SearchAttrs
 */
export interface SearchAttrs extends ControlAttrs<string> {

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
    onFocus?: () => void,

    /**
     * placeholder
     */
    placeholder?: string,

    /**
     * readOnly 
     */
    readOnly?: boolean,

    /**
     * value
     */
    value?: string

}

/**
 * TermChangedEvent signals the search term has changed.
 */
export class TermChangedEvent extends Event<string>{

    constructor(name: string, value: string) { super(name, value); }

}

/** 
 * Search provides an input that can be used in the ui for a search engine.
 */
export class Search extends GenericControl<string, SearchAttrs> {

    view: View = new views.Main(this);

    values = {

        root: {

            id: 'input',

            class: concat(SEARCH, this.attrs.ww && this.attrs.ww.class),

            placeholder: (this.attrs.ww && this.attrs.ww.placeholder) || '',

            readOnly: (this.attrs.ww && this.attrs.ww.readOnly) || null,

            value: (this.attrs.ww && this.attrs.ww.value) || '',

            onfocus: (e: KeyboardEvent) => {

                this.attrs.ww && this.attrs.ww.onFocus();
                (<HTMLInputElement>e.target).value = (<HTMLInputElement>e.target).value;

            },
            onkeydown: (e: KeyboardEvent) => {

                (e.keyCode === ESCAPE) ?
                    this.attrs.ww &&
                    this.attrs.ww.onEscape &&
                    this.attrs.ww.onEscape() :
                    this.attrs.ww &&
                    this.attrs.ww.onSearch &&
                    this.attrs.ww.onSearch(new TermChangedEvent(
                        this.attrs.ww.name,
                        (<HTMLInputElement>e.target).value))

            },
            onkeyup: (e: KeyboardEvent) => {

                if (e.keyCode === ESCAPE)
                    (<HTMLInputElement>e.target).blur();

            },
            oninput: (e: KeyboardEvent) => {

                //For compatability reasons
                (<HTMLInputElement>e.target).oninput = null;
                this.values.root.onkeydown(e);

            }

        }

    }

    set(value: string): Search {

        this
            .view
            .findById(this.values.root.id)
            .map((e: HTMLInputElement) => { e.value = value });

        return this;

    }

    get(): string {

        return this
            .view
            .findById(this.values.root.id)
            .map((e: HTMLInputElement) => e.value)
            .get();

    }

}
