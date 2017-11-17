import * as wml from '@quenk/wml';
import { Page } from '../Page';
import { SelectionChangedEvent } from '@package/self/control/select';
export declare class SelectPage extends Page {
    view: wml.View;
    values: {
        options: {
            label: string;
            value: string;
        }[];
    };
    onChange: ({value}: SelectionChangedEvent) => void;
}
