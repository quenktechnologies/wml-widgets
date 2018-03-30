import * as wml from '@quenk/wml';
import { ItemSelectedEvent, TermChangedEvent } from '../../../../lib/control/autocomplete';
import { Page } from '../Page';
export interface Result {
    label: string;
    value: string;
}
export declare class AutocompletePage extends Page {
    view: wml.View;
    values: {
        id: string;
        name: string;
        results: {
            label: string;
            value: string;
        }[];
    };
    onSearch: ({ value }: TermChangedEvent) => void;
    onSelect: ({ value }: ItemSelectedEvent<Result>) => void;
}
