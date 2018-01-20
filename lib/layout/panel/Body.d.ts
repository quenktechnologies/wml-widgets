import * as wml from '@quenk/wml';
import { Component } from '@quenk/wml';
import { BodyAttrs } from '.';
/**
 * Body part of a Panel for containing the main content.
 */
export declare class Body extends Component<BodyAttrs> {
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
