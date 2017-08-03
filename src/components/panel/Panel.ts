import { Component, Attrs } from '@quenk/wml-runtime';
import * as views from './wml/panel';

export interface PanelAttrs extends Attrs {

    ww?: {

        style?: string

    }

}

export interface HeaderAttrs extends Attrs { }
export interface BodyAttrs extends Attrs { }
export interface FooterAttrs extends Attrs { }

export class Panel extends Component<PanelAttrs> {

    view = new views.Panel(this);

}

export class Header extends Component<HeaderAttrs> {

    view = new views.Header(this);

}

export class Body extends Component<BodyAttrs> {

    view = new views.Body(this);

}

export class Footer extends Component<FooterAttrs> {

    view = new views.Footer(this);

}
