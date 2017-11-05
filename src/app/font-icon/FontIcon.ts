import * as wml from '@quenk/wml';
import { concat } from '@package/self/common/util';
import { StylableAttrs } from '@package/self/content';
import { Main } from './wml/icon';

export interface IconAttrs extends StylableAttrs {

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

        class: concat('loading', this.attrs.ww ? this.attrs.ww.class : '')

    }

}
