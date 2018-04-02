import * as wml from '@quenk/wml';
import * as names from './classNames';
import * as util from '../../util';
import * as views from './wml/nav';
import { WidgetAttrs, StylableAttrs } from '../../';

/**
 * NavAttrs
 */
export interface NavAttrs extends StylableAttrs { }

/**
 * Nav provides styling for displaying a list of anchor links.
 */
export class Nav extends wml.Component<WidgetAttrs<NavAttrs>> {

    view: wml.View = new views.Main(this);

    values = {

        root: {

            class: util.concat(names.NAV,
                this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
