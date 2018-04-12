import { View } from '@quenk/wml';
import { GenericLayout } from '../';
import { PanelHeaderAttrs } from '.';
export declare class PanelHeader extends GenericLayout<PanelHeaderAttrs> {
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
