import * as wml from '@quenk/wml';
import { StylableAttrs } from '@package/self/content';
import { Component, Attrs } from '@quenk/wml';
export interface PanelAttrs extends Attrs {
    ww?: {
        style?: string;
        class?: string;
    };
}
export interface HeaderAttrs extends StylableAttrs {
}
export interface BodyAttrs extends StylableAttrs {
}
export interface FooterAttrs extends StylableAttrs {
}
export declare class Panel extends Component<PanelAttrs> {
    view: wml.View;
    values: {
        class: {
            root: string;
        };
    };
}
export declare class Header extends Component<HeaderAttrs> {
    view: wml.View;
    values: {
        class: {
            root: string;
        };
    };
}
export declare class Body extends Component<BodyAttrs> {
    view: wml.View;
    values: {
        class: {
            root: string;
        };
    };
}
export declare class Footer extends Component<FooterAttrs> {
    view: wml.View;
    values: {
        class: {
            root: string;
        };
    };
}
