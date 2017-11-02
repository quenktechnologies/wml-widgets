import * as names from '@package/self/common/names';
import { Component, Attrs } from '@quenk/wml-runtime';
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

    view = new Main(this);

    values = {

        class: {

            root: names.ICON_BUTTON

        }

    };

}
