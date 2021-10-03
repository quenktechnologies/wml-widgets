import { View } from '@quenk/wml';

import { concat } from '../../util';
import { LAYOUT, LayoutAttrs, AbstractLayout } from '..';
import {WellView} from './wml/well';

///classNames:begin
export const WELL = 'ww-well';
///classNames:end

/**
 * WellAttrs 
 */
export interface WellAttrs extends LayoutAttrs {}

/**
 * Well provides a rectangular container for visually seperating
 * content by context.
 */
export class Well extends AbstractLayout<WellAttrs> {

    view: View = new WellView(this);

    values = {

        /**
         * root values.
         */
        content: {

            id: this.attrs.ww && this.attrs.ww.id,

            wml: {

                id: 'well',

            },

          className: concat(WELL, LAYOUT, 
                this.attrs.ww && this.attrs.ww.className ?
                    <string>this.attrs.ww.className : '')

        }

    }

}
