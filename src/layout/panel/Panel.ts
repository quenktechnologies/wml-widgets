import * as names from '@package/self/common/names';
import * as views from './wml/panel';
import { Component, Attrs } from '@quenk/wml';
import { concat } from '@package/self/common/util';

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

    values = {

        class: {

            root: concat(names.PANEL, this.attrs.ww ?
              this.attrs.ww.style : names.DEFAULT)

        }

    }

}

export class Header extends Component<HeaderAttrs> {

    view = new views.Header(this);

    values = {

        class: {

            root: names.PANEL_HEADER

        }

    }

}

export class Body extends Component<BodyAttrs> {

    view = new views.Body(this);

    values = {

        class: {

            root: names.PANEL_BODY

        }

    }

}

export class Footer extends Component<FooterAttrs> {

    view = new views.Footer(this);

    values = {

        class: {

            root: names.PANEL_FOOTER

        }

    }

}
