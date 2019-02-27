import * as views from './wml/search';
import { View } from '@quenk/wml';
import { concat, getById } from '../../util';
import { getId, getClassName } from '../../';
import { ControlAttrs, Event, AbstractControl } from '../';

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
export class Search extends AbstractControl<string, SearchAttrs> {

    view: View = new views.Main(this);

    values = {

        root: {

          wml: {

            id: 'root'

          },

            id: getId(this.attrs),

            className: concat(SEARCH, getClassName(this.attrs)),

            placeholder: (this.attrs.ww && this.attrs.ww.placeholder) ?
                this.attrs.ww.placeholder : '',

            readOnly: (this.attrs.ww && this.attrs.ww.readOnly) || null,

            value: (this.attrs.ww && this.attrs.ww.value) ?
                this.attrs.ww.value : '',

            onfocus: (e: KeyboardEvent) => {

                let target = <HTMLInputElement>e.target;

                if (this.attrs.ww && this.attrs.ww.onFocus)
                    this.attrs.ww.onFocus();

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
                this.values.root.onkeydown(e);

            }

        }

    }

    set(value: string): Search {

        getById<HTMLInputElement>(this.view, this.values.root.wml.id)
            .map((e: HTMLInputElement) => { e.value = value });

        return this;

    }

    get(): string {

        return getById<HTMLInputElement>(this.view, this.values.root.wml.id)
            .map((e: HTMLInputElement) => e.value)
            .get();

    }

}
