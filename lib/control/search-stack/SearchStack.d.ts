import * as wml from '@quenk/wml';
import { FormControlWidget } from '@package/self/control/form-control';
import { TermChangedEvent, ItemSelectedEvent } from '@package/self/control/autocomplete';
import { StackChangedEvent } from '@package/self/control/stack';
import { SearchStackAttrs } from '.';
/**
 * SearchStack
 */
export declare class SearchStack<V> extends FormControlWidget<V[], SearchStackAttrs<V>> {
    view: wml.View;
    values: {
        id: {
            root: string;
            input: string;
            search: string;
            message: string;
        };
        root: {
            id: string;
            class: string;
        };
        help: {
            id: string;
        };
        search: {
            id: string;
            name: string;
            value: string;
            onSearch: (evt: TermChangedEvent) => void;
            onSelect: ({value}: ItemSelectedEvent<V>) => SearchStack<V>;
        };
        stack: {
            id: string;
            name: string;
            value: V[];
            decorator: (m: V) => string;
            onChange: (evt: StackChangedEvent<V>) => void;
        };
    };
    /**
     * update the list of available options displayed to the user.
     */
    update(list: V[]): SearchStack<V>;
    /**
     * push a value onto the stack.
     */
    push(v: V): SearchStack<V>;
    value(): V[];
}
