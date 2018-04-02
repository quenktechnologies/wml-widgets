import { StylableAttrs } from '../../';

export { Panel } from './Panel';
export { PanelHeader } from './PanelHeader';
export { PanelBody } from './PanelBody';
export { PanelFooter } from './PanelFooter';

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
export interface PanelAttrs extends StylableAttrs {

    /**
     * style of the panel.
     */
    style?: string,

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
