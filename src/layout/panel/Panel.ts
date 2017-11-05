import * as wml from '@quenk/wml';
import * as names from '@package/self/common/names';
import * as views from './wml/panel';
import { StylableAttrs } from '@package/self/content';
import { Component, Attrs } from '@quenk/wml';
import { concat } from '@package/self/common/util';

export interface PanelAttrs extends Attrs {

    ww?: {

        style?: string,
        class?: string

    }

}

export interface HeaderAttrs extends StylableAttrs { }

export interface BodyAttrs extends StylableAttrs { }

export interface FooterAttrs extends StylableAttrs { }

export class Panel extends Component<PanelAttrs> {

    view: wml.View = new views.Panel(this);

    values = {

        class: {

            root: concat(names.PANEL, this.attrs.ww ?
              this.attrs.ww.style : names.DEFAULT, this.attrs.ww ?
              this.attrs.ww.class : '')

        }

    }

}

export class Header extends Component<HeaderAttrs> {

    view: wml.View = new views.Header(this);

    values = {

        class: {

            root: concat(names.PANEL_HEADER,
                this.attrs.ww ? this.attrs.ww.class : '')


        }

    }

}

export class Body extends Component<BodyAttrs> {

    view: wml.View = new views.Body(this);

    values = {

        class: {

            root: concat(names.PANEL_BODY,
                this.attrs.ww ? this.attrs.ww.class : '')


        }

    }

}

export class Footer extends Component<FooterAttrs> {

    view: wml.View = new views.Footer(this);

    values = {

        class: {

            root: concat(names.PANEL_FOOTER,
                this.attrs.ww ? this.attrs.ww.class : '')


        }

    }

}
