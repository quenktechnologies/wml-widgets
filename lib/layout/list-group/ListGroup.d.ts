import * as wml from '@quenk/wml';
import { ListGroupAttrs } from './ListGroupAttrs';
/**
 * ListGroup is used to create a vertical list of content.
 *
 * Children must be ListGroupItems.
 */
export declare class ListGroup extends wml.Component<ListGroupAttrs> {
    view: wml.View;
    values: {
        root: {
            class: string;
        };
    };
}
