import * as names from '@package/self/common/names';
import { Component, Attrs, View } from '@quenk/wml';
import {concat} from '@package/self/common/util';
import { Main } from './wml/icon-button';

export interface IconButtonAttrs extends Attrs {

    ww?: {

        class?: string,

        /**
         * onClick is called when the user clicks on the menu button.
         */
        onClick?: (e: Event) => void

    }

}

/**
 * IconButton provides a 'hamburger' menu button.
 */
export class IconButton extends Component<IconButtonAttrs> {

    view: View = new Main(this);

    values = {

        class: {

            root: names.ICON_BUTTON

        },
        button: {

            class: concat(names.ICON_BUTTON, (this.attrs.ww && this.attrs.ww.class) ?
              this.attrs.ww.class : ''),

            onClick: (this.attrs.ww && this.attrs.ww.onClick) ? this.attrs.ww.onClick : () => { }

        }

    };

}
