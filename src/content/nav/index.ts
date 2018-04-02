import * as wml from '@quenk/wml';
import * as names from './classNames';
import * as util from '../../util';
import * as views from './wml/nav';
import {VERTICAL} from '../orientation/classNames';
import { WidgetAttrs, StylableAttrs } from '../../';

/**
 * NavAttrs
 */
export interface NavAttrs extends StylableAttrs { 

  /**
   * vertical indicates whether to display the nav
   * vertically or horizontally (default).
   */
  vertical?:boolean

}

/**
 * Nav provides styling for displaying a list of anchor links.
 */
export class Nav extends wml.Component<WidgetAttrs<NavAttrs>> {

    view: wml.View = new views.Main(this);

    values = {

        root: {

            class: util.concat(names.NAV,
                this.attrs.ww && this.attrs.ww.class,
            this.attrs.ww && this.attrs.ww.vertical && VERTICAL)

        }

    }

}
