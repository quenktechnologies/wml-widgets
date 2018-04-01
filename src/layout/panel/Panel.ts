import * as wml from '@quenk/wml';
import * as names from '../../common/names';
import * as views from './wml/panel';
import { Component } from '@quenk/wml';
import { concat } from '../../util';
import { PanelAttrs } from '.';

/**
 * Panel provides a rectangular container for visually seperating
 * content by context.
 *
 * This class provides the containing, part that can be further
 * subdivided into a header, body and/or footer section.
 */
export class Panel extends Component<PanelAttrs> {

    view: wml.View = new views.Panel(this);

    /**
     * values
     */
    values = {

        /**
         * root values.
         */
        root: {

            /**
             * class name for the root element.
             */
            class: concat(names.PANEL, this.attrs.ww ?
                this.attrs.ww.style : names.DEFAULT, this.attrs.ww ?
                    this.attrs.ww.class : '')

        }

    }

}

