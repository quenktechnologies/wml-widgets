import * as wml from '@quenk/wml';
import { StylableAttrs } from '@package/wml-widgets/content';
export { Panel } from './Panel';
export { Header } from './Header';
export { Body } from './Body';
export { Footer } from './Footer';
/**
 * PanelAttrs for the containing part of the Panel.
 */
export interface PanelAttrs extends wml.Attrs {
    ww?: {
        style?: string;
        class?: string;
    };
}
/**
 * HeaderAttrs for the header part of the Panel.
 */
export interface HeaderAttrs extends StylableAttrs {
}
/**
 * BodyAttrs for the body part of the Panel.
 */
export interface BodyAttrs extends StylableAttrs {
}
/**
 * FooterAttrs for the footer part of the Panel.
 */
export interface FooterAttrs extends StylableAttrs {
}
