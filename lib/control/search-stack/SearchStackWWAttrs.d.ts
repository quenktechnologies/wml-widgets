import { FormControlWWAttrs } from '@package/self/control';
import { TermChangedEvent } from '@package/self/control/search';
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
