import { View, Component } from '@quenk/wml';

import { concat } from '../../util';
import { HTMLElementAttrs, getClassName, getId } from '../../';
import { Main } from './wml/embed';

///classNames:begin
export const EMBED = 'ww-embed';
///classNames:end

/**
 * EmbedAttrs
 */
export interface EmbedAttrs extends HTMLElementAttrs {}

/**
 * Embed
 */
export class Embed extends Component<EmbedAttrs> {

    view: View = new Main(this);

    values = {

        wml: {

            id: 'embed'

        },

        id: getId(this.attrs),

        className: concat(EMBED, getClassName(this.attrs)),

    }

}
