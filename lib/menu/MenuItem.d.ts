import * as wml from '@quenk/wml';
import { MenuItemClickedEvent } from './MenuItemClickedEvent';
export interface MenuItemAttrs extends wml.Attrs {
    ww?: {
        name?: string;
        text?: string;
        disabled?: boolean;
        onClick?: (e: MenuItemClickedEvent) => void;
    };
}
/**
 * MenuItem
 */
export declare class MenuItem extends wml.Component<MenuItemAttrs> {
    view: wml.View;
    values: {
        id: {
            root: string;
        };
        class: {
            root: string;
        };
        text: string;
        clicked: () => void | (() => void);
    };
}
