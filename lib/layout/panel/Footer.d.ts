import * as wml from '@quenk/wml';
import { Component } from '@quenk/wml';
import { FooterAttrs } from '.';
/**
 * Footer part of the panel for summary content etc.
 */
export declare class Footer extends Component<FooterAttrs> {
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
