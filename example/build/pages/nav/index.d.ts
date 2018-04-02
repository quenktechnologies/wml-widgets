import * as wml from '@quenk/wml';
import { LinkClickedEvent } from '../../../../lib/content/nav/link';
import { Page } from '../Page';
export declare class NavPage extends Page {
    view: wml.View;
    active: string;
    links: {
        Home: {};
        Profile: {};
        Messages: {};
    };
    navigate: (e: LinkClickedEvent) => void;
}
