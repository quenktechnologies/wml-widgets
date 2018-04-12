import { View } from '@quenk/wml';
import { LayoutAttrs, GenericLayout } from '../';
export declare const MAIN_LAYOUT = "ww-main-layout";
/**
 * MainAttrs
 */
export interface MainAttrs extends LayoutAttrs {
}
/**
 * MainLayout provides a container for the main content of an application.
 */
export declare class MainLayout extends GenericLayout<MainAttrs> {
    view: View;
    values: {
        content: {
            id: string;
            class: string;
        };
    };
}
