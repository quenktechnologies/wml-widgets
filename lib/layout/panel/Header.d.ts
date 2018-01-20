import * as wml from '@quenk/wml';
import { Component } from '@quenk/wml';
import { HeaderAttrs } from '.';
export declare class Header extends Component<HeaderAttrs> {
    view: wml.View;
    /**
     * values
     */
    values: {
        root: {
            class: string;
        };
    };
}
