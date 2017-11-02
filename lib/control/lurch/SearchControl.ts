import { debounce } from '@package/self/common/util';
import { TermChangedEvent } from './TermChangedEvent';
import { SearchAttrs } from './SearchAttrs';
import { SearchDelegate } from './SearchDelegate';
import { SearchDefaultDelegate } from './SearchDefaultDelegate';
import { FormControl } from '@package/self/control';
import { SearchValues } from './SearchValues';

export const ESCAPE = 27;
export const DEFAULT_DEBOUNCE_TIME = 500;
export const INPUT_ID = 'input';

/** 
 * SearchControl
 */
export abstract class SearchControl<V, A extends SearchAttrs<V>> extends FormControl<V, A> {

    abstract values: SearchValues<V>;

    DEFAULT_DEBOUNCE_TIME = DEFAULT_DEBOUNCE_TIME;

    delegate: SearchDelegate<V> = this.attrs.ww.delegate ?
        this.attrs.ww.delegate : new SearchDefaultDelegate(this.attrs.ww);

    results: V[] = [];

    onKeyDown = (e: KeyboardEvent) => (e.keyCode !== ESCAPE) ? this.execute(null) : null;

    onKeyUp = (e: KeyboardEvent) => {

        let target = <HTMLInputElement>e.target;

        if (e.keyCode === ESCAPE) {

            target.blur();
            this.close();

        }

    };

    onInput = (e: KeyboardEvent) => {

        //For compatability reasons
        (<HTMLInputElement>e.target).onkeydown = null;
        this.onKeyDown(e);

    };

    execute = debounce(() => {

        this
            .view
            .findById(this.values.input.id)
            .map(({ value }: HTMLInputElement) =>
                this.delegate.onSearch(
                    new TermChangedEvent(this.attrs.ww.name, value)));

    }, this.attrs.ww.debounce || this.DEFAULT_DEBOUNCE_TIME);

    stringify = (v: V) => String(v);

    /**
     * update the Search with new results.
     */
    abstract update(results: V[]): SearchControl<V, A>;

    /**
     * open the search result dialog.
     */
    abstract open(): SearchControl<V, A>;

    /**
     * close the search result dialog.
     */
    abstract close(): SearchControl<V, A>;

    rendered(): void {

        document.addEventListener('click', this);

    }

    handleEvent(e: Event): void {

        this
            .view
            .findById(this.values.id.root)
            .map((root: HTMLElement) => {

                if (!root.contains(<Node>e.target))
                    this.close();

                if (!document.body.contains(root))
                    document.removeEventListener('click', this);

            })
    }

}
