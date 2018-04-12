import * as views from './wml/main-layout';
import { View  } from '@quenk/wml';
import { concat } from '../../util';
import { LAYOUT, LayoutAttrs, GenericLayout } from '../';

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
export class MainLayout extends GenericLayout<MainAttrs> {

    view: View = new views.Main(this);

    values = {

        content: {

            id: 'main',

            class: concat(
                MAIN_LAYOUT,
                LAYOUT,
                this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
