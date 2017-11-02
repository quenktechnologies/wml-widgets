import * as wml from '@quenk/wml';
import { ButtonChangedEvent } from '@package/self/control/button-select';
import { Page } from '../Page';
export declare class ButtonSelectPage extends Page {
    view: wml.View;
    values: {
        options: {
            text: string;
            value: string;
        }[];
    };
    onChange: ({value, name}: ButtonChangedEvent<string | string[]>) => void;
}
