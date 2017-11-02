import * as views from './wml/panel';
import { Component, Attrs } from '@quenk/wml';
export interface PanelAttrs extends Attrs {
    ww?: {
        style?: string;
    };
}
export interface HeaderAttrs extends Attrs {
}
export interface BodyAttrs extends Attrs {
}
export interface FooterAttrs extends Attrs {
}
export declare class Panel extends Component<PanelAttrs> {
    view: views.Panel;
    values: {
        class: {
            root: string;
        };
    };
}
export declare class Header extends Component<HeaderAttrs> {
    view: views.Header;
    values: {
        class: {
            root: string;
        };
    };
}
export declare class Body extends Component<BodyAttrs> {
    view: views.Body;
    values: {
        class: {
            root: string;
        };
    };
}
export declare class Footer extends Component<FooterAttrs> {
    view: views.Footer;
    values: {
        class: {
            root: string;
        };
    };
}
