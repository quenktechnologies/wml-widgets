import * as views from './wml/breadcrumb';
import { Component, View } from '@quenk/wml';
import { concat } from '../../../util';
import { WidgetAttrs, StylableAttrs } from '../../..';

///classNames:begin
export const BREADCRUMB = 'ww-breadcrumb'; //@todo un-bootstrap
///classNames:end

export {Item} from '../item';
export {Link} from '../link';

/**
 * Breadcrumb
 */
export interface BreadcrumbAttrs extends StylableAttrs { }

/**
 * Breadcrumb
 */
export class Breadcrumb extends Component<WidgetAttrs<BreadcrumbAttrs>>{

    view: View = new views.Main(this);

    values = {

        root: {

            class: concat(BREADCRUMB, this.attrs.ww ? this.attrs.ww.class : '')

        }

    };

}
