import * as names from '@package/self/common/names';
import * as views from './wml/breadcrumbs';
import {concat} from '@package/self/common/util';
import { Component, Attrs, View } from '@quenk/wml';

export interface BreadCrumbsAttrs extends Attrs {

    ww?: {

        class?: string

    }

};

/**
 * BreadCrumb
 */
export class BreadCrumbs extends Component<BreadCrumbsAttrs>{

    view: View = new views.BreadCrumbs(this);

    values = {

        class: {
          
          root: concat( names.BREAD_CRUMBS, this.attrs.ww?this.attrs.ww.class:'')

        }

    };

}
