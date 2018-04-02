import * as wml from '@quenk/wml';
import * as style from '../../content/style';
import { WidgetAttrs } from '../../';
import { Component } from '@quenk/wml';
import { concat } from '../../util';
import { Main } from './wml/panel';
import { PANEL, PanelAttrs } from '.';

/**
 * Panel provides a rectangular container for visually seperating
 * content by context.
 *
 * This class provides the containing, part that can be further
 * subdivided into a header, body and/or footer section.
 */
export class Panel extends Component<WidgetAttrs<PanelAttrs>> {

    view: wml.View = new Main(this);

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
            class: concat(PANEL, this.attrs.ww ?
                this.attrs.ww.style : style.DEFAULT, this.attrs.ww ?
                    this.attrs.ww.class : '')

        }

    }

}

