import { StylableAttrs } from '../../';
export { Panel } from './Panel';
export { PanelHeader } from './PanelHeader';
export { PanelBody } from './PanelBody';
export { PanelFooter } from './PanelFooter';
/**
 * PanelAttrs for the containing part of the Panel.
 */
export interface PanelAttrs extends StylableAttrs {
    /**
     * style of the panel.
     */
    style?: string;
}
/**
 * PanelHeaderAttrs for the header part of the Panel.
 */
export interface PanelHeaderAttrs extends PanelAttrs {
}
/**
 * PanelBodyAttrs for the body part of the Panel.
 */
export interface PanelBodyAttrs extends PanelAttrs {
}
/**
 * PanelFooterAttrs for the footer part of the Panel.
 */
export interface PanelFooterAttrs extends PanelAttrs {
}
