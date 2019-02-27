import { View } from '@quenk/wml';
import { Style } from '../../content/style';
import { LayoutAttrs, AbstractLayout } from '..';
/**
 * PANEL wrapper class.
 */
export declare const PANEL = "ww-panel";
/**
 * PANEL_HEADER class name.
 */
export declare const PANEL_HEADER = "ww-panel__header";
/**
 * PANEL_BODY class name.
 */
export declare const PANEL_BODY = "ww-panel__body";
/**
 * PANEL_FOOTER class name.
 */
export declare const PANEL_FOOTER = "ww-panel__footer";
/**
 * PanelAttrs for the containing part of the Panel.
 */
export interface PanelAttrs extends LayoutAttrs {
    /**
     * style of the panel.
     */
    style?: Style;
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
/**
 * Panel provides a rectangular container for visually seperating
 * content by context.
 */
export declare class Panel extends AbstractLayout<PanelAttrs> {
    view: View;
    /**
     * values
     */
    values: {
        /**
         * root values.
         */
        content: {
            id: string | undefined;
            wml: {
                id: string;
            };
            className: string;
        };
    };
}
/**
 * PanelHeader
 */
export declare class PanelHeader extends AbstractLayout<PanelHeaderAttrs> {
    view: View;
    /**
     * values
     */
    values: {
        content: {
            wml: {
                id: string;
            };
            id: string | undefined;
            className: string;
        };
    };
}
/**
 * PanelBody
 */
export declare class PanelBody extends AbstractLayout<PanelBodyAttrs> {
    view: View;
    /**
     * values
     */
    values: {
        content: {
            wml: {
                id: string;
            };
            id: string | undefined;
            className: string;
        };
    };
}
/**
 * PanelFooter
 */
export declare class PanelFooter extends AbstractLayout<PanelFooterAttrs> {
    view: View;
    /**
     * values
     */
    values: {
        content: {
            wml: {
                id: string;
            };
            id: string | undefined;
            className: string;
        };
    };
}
