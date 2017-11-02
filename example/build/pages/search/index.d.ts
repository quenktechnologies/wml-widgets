import * as wml from '@quenk/wml';
import { ResultSelectedEvent } from '@package/self/control/search/ResultSelectedEvent';
import { TermChangedEvent } from '@package/self/control/search/TermChangedEvent';
import { Page } from '../Page';
export interface Result {
    label: string;
    value: string;
}
export declare class SearchPage extends Page {
    view: wml.View;
    values: {
        id: string;
        name: string;
        results: {
            label: string;
            value: string;
        }[];
    };
    onChange: ({value}: TermChangedEvent) => void;
    onSelect: ({value}: ResultSelectedEvent<Result>) => void;
}
