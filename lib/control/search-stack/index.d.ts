import * as wml from '@quenk/wml';
import { FormControlWWAttrs } from '../../control/form-control';
import { TermChangedEvent } from '../../control/search-control';
export { SearchStack } from './SearchStack';
export { StackChangedEvent } from '../../control/stack';
export { TermChangedEvent } from '../../control/search-control';
export interface SearchStackAttrs<V> extends wml.Attrs {
    ww: SearchStackWWAttrs<V>;
}
export interface SearchStackWWAttrs<V> extends FormControlWWAttrs<V[]> {
    /**
     * onSearch receives events from the SearchControl.
     */
    onSearch?: (s: TermChangedEvent) => void;
    /**
     * decorator is to the Stack control.
     */
    decorator?: (m: V) => string;
}
