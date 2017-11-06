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
 * Header can be used to display non-clickable heading text in a nav list.
 */
export class Header extends wml.Component<HeaderAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        item: {

            class: ''

        },
        span: {

            class: concat(names.NAV_MENU_HEADER,
                this.attrs.ww ? this.attrs.ww.class : '')

        },

        text: (this.attrs.ww && this.attrs.ww.text) ?
            this.attrs.ww.text : null

    }

}
