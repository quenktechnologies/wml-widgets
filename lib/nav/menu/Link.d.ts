import * as wml from '@quenk/wml';
import * as link from '../../nav/link';
/**
 * Link provides a link entry into a nav menu.
 */
export declare class Link extends link.Link {
    view: wml.View;
    values: {
        id: {
            root: string;
        };
        class: {
            root: string;
        };
        item: {
            class: string;
        };
        a: {
            class: string;
            title: string;
            name: string;
            href: string;
            active: boolean;
            text: string;
            onClick: (e: link.LinkClickedEvent) => void;
        };
    };
}
