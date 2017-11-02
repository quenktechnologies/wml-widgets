import * as names from '@package/self/common/names';
import * as views from './wml/header';
import * as wml from '@quenk/wml';
import { concat } from '@package/self/common/util';

export interface HeaderAttrs extends wml.Attrs {

    ww?: {

        class?: string,
        text?: string

    }

}

/**
 * Header
 */
export class Header extends wml.Component<HeaderAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        class: {

            root: concat(names.MENU_HEADER,
                this.attrs.ww ? this.attrs.ww.class : '')

        },

        text: (this.attrs.ww && this.attrs.ww.text) ?
            this.attrs.ww.text : null

    }

}
