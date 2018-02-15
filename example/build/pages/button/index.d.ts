import * as wml from '@quenk/wml';
import { Page } from '../Page';
export declare class ButtonPage extends Page {
    view: wml.View;
    values: {
        capitalize: (s: string) => string;
        styles: {
            default: string;
            primary: string;
            success: string;
            danger: string;
            warning: string;
            info: string;
            light: string;
            dark: string;
        };
    };
}
