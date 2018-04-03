import * as wml from '@quenk/wml';
import { Page } from '../Page';
export declare class ButtonPage extends Page {
    view: wml.View;
    values: {
        capitalize: (s: string) => string;
        styles: any;
        sizes: any;
    };
}
