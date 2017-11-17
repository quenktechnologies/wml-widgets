import * as wml from '@quenk/wml';
import { FormControlWWAttrs } from '@package/self/control/form-control';
import { TermChangedEvent } from '@package/self/control/search-control';
export { SearchStack } from './SearchStack';
export { StackChangedEvent } from '@package/self/control/stack';
export { TermChangedEvent } from '@package/self/control/search-control';
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
