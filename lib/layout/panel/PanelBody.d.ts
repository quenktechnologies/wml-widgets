import { View } from '@quenk/wml';
import { GenericLayout } from '../';
import { PanelBodyAttrs } from '.';
/**
 * PanelBody part of a Panel for containing the main content.
 */
export declare class PanelBody extends GenericLayout<PanelBodyAttrs> {
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
