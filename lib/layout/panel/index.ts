import * as style from '../../content/style';
import * as views from './wml/panel';
import { View } from '@quenk/wml';
import { concat } from '../../util';
import { Style } from '../../content/style';
import { LAYOUT, LayoutAttrs, AbstractLayout } from '..';

///classNames:begin

/**
 * PANEL wrapper class.
 */
export const PANEL = 'ww-panel';

/**
 * PANEL_HEADER class name.
 */
export const PANEL_HEADER = 'ww-panel__header';

/**
 * PANEL_BODY class name.
 */
export const PANEL_BODY = 'ww-panel__body';

/**
 * PANEL_FOOTER class name.
 */
export const PANEL_FOOTER = 'ww-panel__footer';

///classNames:end

/**
 * PanelAttrs for the containing part of the Panel.
 */
export interface PanelAttrs extends LayoutAttrs {

    /**
     * style of the panel.
     */
    style?: Style,

}

/**
 * PanelHeaderAttrs for the header part of the Panel.
 */
export interface PanelHeaderAttrs extends PanelAttrs { }

/**
 * PanelBodyAttrs for the body part of the Panel.
 */
export interface PanelBodyAttrs extends PanelAttrs { }

/**
 * PanelFooterAttrs for the footer part of the Panel.
 */
export interface PanelFooterAttrs extends PanelAttrs { }

/**
 * Panel provides a rectangular container for visually seperating
 * content by context.
 */
export class Panel extends AbstractLayout<PanelAttrs> {

    view: View = new views.Panel(this);

    /**
     * values
     */
    values = {

        /**
         * root values.
         */
        content: {

            id: this.attrs.ww && this.attrs.ww.id,

            wml: {

                id: 'panel',

            },

          className: concat(PANEL, LAYOUT, 
          (this.attrs.ww && this.attrs.ww.style) ?
            `-${this.attrs.ww.style}` : style.DEFAULT,
                this.attrs.ww && this.attrs.ww.className ?
                    <string>this.attrs.ww.className : '')

        }

    }

}

/**
 * PanelHeader
 */
export class PanelHeader extends AbstractLayout<PanelHeaderAttrs> {

    view: View = new views.PanelHeader(this);

    /**
     * values
     */
    values = {

        content: {

            wml: {

                id: 'header'

            },

            id: this.attrs.ww && this.attrs.ww.id,

            className: concat(PANEL_HEADER, LAYOUT,
                this.attrs.ww && this.attrs.ww.className ?
                    this.attrs.ww.className : '')

        }

    }

}

/**
 * PanelBody 
 */
export class PanelBody extends AbstractLayout<PanelBodyAttrs> {

    view: View = new views.PanelBody(this);

    /**
     * values
     */
    values = {

        content: {

            wml: {

                id: 'body'

            },

            id: this.attrs.ww && this.attrs.ww.id,

            className: concat(PANEL_BODY, LAYOUT,
                this.attrs.ww && this.attrs.ww.className ?
                    this.attrs.ww.className : '')

        }

    }

}

/**
 * PanelFooter
 */
export class PanelFooter extends AbstractLayout<PanelFooterAttrs> {

    view: View = new views.PanelFooter(this);

    /**
     * values
     */
    values = {

        content: {

            wml: {

                id: 'footer'

            },

            id: this.attrs.ww && this.attrs.ww.id,

            className: concat(PANEL_FOOTER, LAYOUT,
                this.attrs.ww && this.attrs.ww.className ?
                    this.attrs.ww.className : '')

        }

    }

}
