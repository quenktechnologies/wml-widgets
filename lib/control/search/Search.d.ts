import * as wml from '@quenk/wml';
import { Populated, Empty } from './Template';
import { MenuItemClickedEvent } from "@package/self/menu/MenuItemClickedEvent";
import { TermChangedEvent } from './TermChangedEvent';
import { EscapeEvent } from './EscapeEvent';
import { SearchDelegate } from './SearchDelegate';
import { ResultSelectedEvent } from './ResultSelectedEvent';
import { Result } from './Result';
export declare const ESCAPE = 27;
export declare const DEFAULT_DEBOUNCE_TIME = 500;
export declare const INPUT_ID = "input";
/**
 * debounce a function so that it is only called once after
 * a period of time.
 */
export declare const debounce: <A>(f: (a: A) => void, delay: number) => (a: A) => void;
/**
 * SearchAttrs
 */
export interface SearchAttrs<A extends Result> extends wml.Attrs {
    ww: {
        /**
         * name used when generating events.
         */
        name: string;
        /**
         * value of the search input at render time.
         */
        value?: string | boolean | number;
        /**
         * populated template for rendering each search result item.
         */
        populated?: Populated;
        /**
         * empty template for rendering the lack of search results.
         */
        empty?: Empty;
        /**
         * SearchModel for intercepting all events.
         */
        delegate?: SearchDelegate<A>;
        /**
         * class name to append to the top level DOM rendered
         */
        class?: string;
        /**
         * inputClass is the class list for the input.
         */
        inputClass?: string;
        /**
         * placeholder text for the input.
         */
        placeholder?: string;
        /**
         * debounce is the length of time to debounce keyboard events.
         *
         * Set to 0 to disable debouncing.
         */
        debounce?: number;
        /**
         * decorator function for getting the text value of
         * a result item when using the default populated template.
         */
        decorator?: (r: A) => string;
        /**
         * onChange handler.
         */
        onChange?: (e: TermChangedEvent) => void;
        /**
         * onEscape handler.
         */
        onEscape?: (e: EscapeEvent) => void;
        /**
         * onSelect handler.
         */
        onSelect?: (e: ResultSelectedEvent<A>) => void;
    };
}
/**
 * Search control.
 */
export declare class Search<A extends Result> extends wml.Component<SearchAttrs<A>> {
    view: wml.View;
    defaultDelegate: SearchDelegate<A>;
    template: {
        populated: Populated;
        empty: Empty;
    };
    values: {
        id: {
            root: string;
            input: string;
            menu: string;
        };
        class: {
            input: string;
            root: string;
        };
        input: {
            placeholder: string;
            onKeyDown: (e: KeyboardEvent) => void;
            onKeyUp: (e: KeyboardEvent) => void;
            onInput: (e: KeyboardEvent) => void;
        };
        search: {
            delegate: SearchDelegate<A>;
            delay: number;
            results: A[];
        };
        item: {
            template: {
                populated: Populated;
                empty: Empty;
            };
            decorator: (r: A) => string;
            clicked: ({name}: MenuItemClickedEvent) => void;
        };
    };
    execute: (a: {}) => void;
    /**
     * update the Search with new results.
     */
    update(results: A[]): Search<A>;
    rendered(): void;
    handleEvent(e: Event): void;
}
