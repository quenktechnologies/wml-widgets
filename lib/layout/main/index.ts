import * as views from './wml/main';
import { View } from '@quenk/wml';
import { concat } from '../../util';
import { LAYOUT, LayoutAttrs, AbstractLayout } from '../';

///classNames:begin
export const MAIN_LAYOUT = 'ww-main-layout';
///classNames:end

/**
 * MainAttrs
 */
export interface MainAttrs extends LayoutAttrs { }

/**
 * MainLayout provides a container for the main content of an application.
 */
export class MainLayout extends AbstractLayout<MainAttrs> {

    view: View = new views.Main(this);

    values = {

        content: {

            wml: {

                id: 'main'

            },

            id: (this.attrs && this.attrs) ? this.attrs.id : '',

            className: concat(MAIN_LAYOUT, LAYOUT, (this.attrs && this.attrs) ?
              <string>this.attrs.className : '')

        }

    }

}
