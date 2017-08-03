import { Component, Attrs } from '@quenk/wml-runtime';
import * as views from './wml/panel';
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
    view: views.Panel<this>;
}
export declare class Header extends Component<HeaderAttrs> {
    view: views.Header<this>;
}
export declare class Body extends Component<BodyAttrs> {
    view: views.Body<this>;
}
export declare class Footer extends Component<FooterAttrs> {
    view: views.Footer<this>;
}
