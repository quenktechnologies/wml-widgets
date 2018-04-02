import * as wml from '@quenk/wml';
import * as names from './classNames';
import * as style from '../../content/style/classNames';
import { WidgetAttrs } from '../../';
import { Component } from '@quenk/wml';
import { concat } from '../../util';
import { Main } from './wml/panel';
import { PanelAttrs } from '.';

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
            class: concat(names.PANEL, this.attrs.ww ?
                this.attrs.ww.style : style.DEFAULT, this.attrs.ww ?
                    this.attrs.ww.class : '')

        }

    }

}

