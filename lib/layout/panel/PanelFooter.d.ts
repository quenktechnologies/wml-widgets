import { View } from '@quenk/wml';
import { GenericLayout } from '../';
import { PanelFooterAttrs } from '.';
/**
 * PanelFooter part of the panel for summary content etc.
 */
export declare class PanelFooter extends GenericLayout<PanelFooterAttrs> {
    view: View;
    /**
     * values
     */
    values: {
        content: {
            id: string;
            class: string;
        };
    };
}
