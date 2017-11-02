import * as names from '@package/self/common/names';
import * as views from './wml/text';
import * as wml from '@quenk/wml';
import { concat } from '@package/self/common/util';

export interface TextAttrs extends wml.Attrs {

    ww?: {

        class?: string,
        text?: string

    }

}

/**
 * Text can be used to display non-clickable heading text in a nav list.
 */
export class Text extends wml.Component<TextAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        class: {

            root: concat(names.NAV_LIST_ITEM_TEXT,
                this.attrs.ww ? this.attrs.ww.class : '')

        },

        text: (this.attrs.ww && this.attrs.ww.text) ?
            this.attrs.ww.text : null

    }

}
