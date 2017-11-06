import * as wml from '@quenk/wml';
import { Main } from './wml/icon';

export interface IconAttrs extends wml.Attrs {

    ww: {

        /**
         * classes for this font icon.
         */
        class: string

    }

}

/**
 * FontIcon allows the usage of font icons.
 */
export class FontIcon extends wml.Component<IconAttrs>{

    view: wml.View = new Main(this);

    values = {

        root: {

            class: this.attrs.ww ? this.attrs.ww.class : ''

        }
    }

}
