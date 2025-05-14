import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { BLOCK } from '../../content/orientation';
import { HTMLElementAttrs, getClassName, getId } from '../../';
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
    src?: string;

    /**
     * alt
     */
    alt?: string;

    /**
     * block
     */
    block?: boolean;
}

/**
 * Image
 */
export class Image extends Component<ImageAttrs> {
    view: View = new Main(this);

    values = {
        wml: {
            id: 'image'
        },

        id: getId(this.attrs),

        className: concat(
            IMAGE,
            getClassName(this.attrs),
            this.attrs && this.attrs.block ? BLOCK : ''
        ),

        src: this.attrs && this.attrs.src ? this.attrs.src : '',

        alt: this.attrs && this.attrs.alt ? this.attrs.alt : ''
    };
}
