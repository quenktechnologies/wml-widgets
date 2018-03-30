import * as wml from '@quenk/wml';
import { TermChangedEvent, StackChangedEvent } from '../../../../lib/control/search-stack';
import { Page } from '../Page';
export interface Result {
    label: string;
    value: string;
}
export declare class SearchStackPage extends Page {
    view: wml.View;
    values: {
        id: string;
        name: string;
        text: () => string;
        selected: Result[];
        options: {
            label: string;
            value: string;
        }[];
    };
    onSearch: ({ value }: TermChangedEvent) => void;
    onChange: ({ value }: StackChangedEvent<Result>) => void;
}
