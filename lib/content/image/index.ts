import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { BLOCK } from '../../content/orientation';
import { HTMLElementAttrs, WidgetAttrs, getClassName, getId } from '../../';
import { Main } from './wml/image';

///classNames:begin
export const IMAGE = 'ww-image';
///classNames:end

/**
 * ImageAttrs
 */
export interface ImageAttrs extends HTMLElementAttrs {

    /**
     * src
     */
    src?: string

    /**
     * alt
     */
    alt?: string,

    /**
     * block 
     */
    block?: boolean

}

/**
 * Image
 */
export class Image extends Component<WidgetAttrs<ImageAttrs>> {

    view: View = new Main(this);

    values = {

        wml: {

            id: 'image'

        },

        id: getId(this.attrs),

        className: concat(IMAGE, getClassName(this.attrs),
            (this.attrs.ww && this.attrs.ww.block) ?
                BLOCK : ''),

        src: (this.attrs.ww && this.attrs.ww.src) ? this.attrs.ww.src : '',

        alt: (this.attrs.ww && this.attrs.ww.alt) ? this.attrs.ww.alt : '',

    }

}
