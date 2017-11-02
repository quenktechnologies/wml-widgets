import * as names from '@package/self/common/names';
import * as views from './wml/search';
import * as wml from '@quenk/wml';
import { Populated, Empty } from './Template';
import { Menu } from "@package/self/menu/Menu"
import { MenuItemClickedEvent } from "@package/self/menu/MenuItemClickedEvent"
import { concat } from '@package/self/common/util';
import { TermChangedEvent } from './TermChangedEvent';
import { EscapeEvent } from './EscapeEvent';
import { SearchDelegate } from './SearchDelegate';
import { DefaultSearchDelegate } from './DefaultSearchDelegate';
import { ResultSelectedEvent } from './ResultSelectedEvent';
import { Result } from './Result';

export const ESCAPE = 27;
export const DEFAULT_DEBOUNCE_TIME = 500;
export const INPUT_ID = 'input';

/**
 * debounce a function so that it is only called once after 
 * a period of time.
 */
export const debounce = <A>(f: (a: A) => void, delay: number) => {

    let timer: number = null;

    return delay === 0 ? f : (a: A) => {

        if (!timer) {
            timer = setTimeout(() => f(a), delay);
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => f(a), delay);
        }
    }

}

/**
 * SearchAttrs
 */
export interface SearchAttrs<A extends Result> extends wml.Attrs {

    ww: {

        /**
         * name used when generating events.
         */
        name: string,

        /**
         * value of the search input at render time.
         */
        value?: string | boolean | number,

        /**
         * populated template for rendering each search result item.
         */
        populated?: Populated,

        /**
         * empty template for rendering the lack of search results.
         */
        empty?: Empty,

        /**
         * SearchModel for intercepting all events.
         */
        delegate?: SearchDelegate<A>,

        /**
         * class name to append to the top level DOM rendered
         */
        class?: string,

        /**
         * inputClass is the class list for the input.
         */
        inputClass?: string,

        /**
         * placeholder text for the input.
         */
        placeholder?: string,

        /**
         * debounce is the length of time to debounce keyboard events.
         *
         * Set to 0 to disable debouncing.
         */
        debounce?: number,

        /**
         * decorator function for getting the text value of 
         * a result item when using the default populated template.
         */
        decorator?: (r: A) => string,

        /**
         * onChange handler.
         */
        onChange?: (e: TermChangedEvent) => void,

        /**
         * onEscape handler.
         */
        onEscape?: (e: EscapeEvent) => void,

        /**
         * onSelect handler.
         */
        onSelect?: (e: ResultSelectedEvent<A>) => void

    }

}

const _results = <A>(): A[] => [];

/** 
 * Search control.
 */
export class Search<A extends Result> extends wml.Component<SearchAttrs<A>> {

    view: wml.View = new views.Main(this);

    defaultDelegate: SearchDelegate<A> = new DefaultSearchDelegate(this);

    template: { populated: Populated, empty: Empty } = {

        populated: (this.attrs.ww.populated) ?
            this.attrs.ww.populated : views.populated,

        empty: (this.attrs.ww.empty) ?
            this.attrs.ww.empty : views.empty

    };

    values = {

        id: {

            root: 'root',
            input: 'input',
            menu: 'menu'

        },
        class: {

            input: this.attrs.ww.inputClass,
            root: concat(names.SEARCH, this.attrs.ww.class)
        },
        input: {

            placeholder: this.attrs.ww.placeholder ?
                this.attrs.ww.placeholder : null,

            onKeyDown: (e: KeyboardEvent) => (e.keyCode !== ESCAPE) ?
                this.execute(null) : null,

            onKeyUp: (e: KeyboardEvent) => {

                let target = <HTMLInputElement>e.target;

                if (e.keyCode === ESCAPE) {

                    target.blur();
                    this
                        .view
                        .findById(this.values.id.menu)
                        .map((m: Menu) => m.hide())
                        .map(() => this.values.search.delegate.onEscape(new EscapeEvent()));

                }

            },
            onInput: (e: KeyboardEvent) => {

                //For compatability reasons
                (<HTMLInputElement>e.target).onkeydown = null;
                this.values.input.onKeyDown(e);

            }
        },
        search: {

            delegate: this.attrs.ww.delegate ?
                this.attrs.ww.delegate : this.defaultDelegate,

            delay: this.attrs.ww.debounce ?
                this.attrs.ww.debounce : DEFAULT_DEBOUNCE_TIME,

            results: _results<A>()

        },
        item: {

            template: this.template,

            decorator: this.attrs.ww.decorator ?
                this.attrs.ww.decorator : (a: A) => a.toString(),

            clicked: ({ name }: MenuItemClickedEvent) => {

                this
                    .view
                    .findById(this.values.id.menu)
                    .map((m: Menu) => {
                        m.hide();

                        this.values.search.delegate.onSelect(
                            new ResultSelectedEvent(
                                this.attrs.ww.name,
                                this.values.search.results[Number(name)]));


                    });

            }

        }

    };

    execute = debounce(() => {

        this
            .view
            .findById(this.values.id.input)
            .map(({ value }: HTMLInputElement) =>
                this.values.search.delegate.onChange(
                    new TermChangedEvent(this.attrs.ww.name, value)));

    }, this.values.search.delay);

    /**
     * update the Search with new results.
     */
    update(results: A[]): Search<A> {

        this.values.search.results = results;

        this
            .view
            .findById(this.values.id.menu)
            .map((m: Menu) =>
                m.setContent(new views.Results(this)).show());

        return this;

    }

    rendered(): void {

        document.addEventListener('click', this);

    }

    handleEvent(e: Event): void {

        this
            .view
            .findById(this.values.id.root)
            .map((root: HTMLElement) => {

                if (!root.contains(<Node>e.target))
                    this
                        .view
                        .findById(this.values.id.menu)
                        .cata(() => { }, (m: Menu) => m.hide());

                if (!document.body.contains(root))
                    document.removeEventListener('click', this);

            })
    }

}
