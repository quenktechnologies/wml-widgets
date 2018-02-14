import * as wml from '@quenk/wml';
import { Page } from '../Page';
import { StackChangedEvent } from '@package/wml-widgets/control/stack';
export interface Member {
    label: string;
    value: string;
}
export declare class StackPage extends Page {
    view: wml.View;
    values: {
        values: {
            label: string;
            value: string;
        }[];
        text: string;
        decorator: (m: Member) => string;
    };
    onChange: ({value}: StackChangedEvent<{
        label: string;
        value: string;
    }>) => void;
}
