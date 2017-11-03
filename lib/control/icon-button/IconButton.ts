import * as names from '@package/self/common/names';
import { Component, Attrs,View } from '@quenk/wml';
import { Main } from './wml/icon-button';

export interface IconButtonAttrs extends Attrs {

    ww?: {

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

  view:View = new Main(this);

    values = {

        class: {

            root: names.ICON_BUTTON

        },
        button: {

            onClick: (this.attrs.ww && this.attrs.ww.onClick) ? this.attrs.ww.onClick : () => { }

        }

    };

}
