import { View } from '@quenk/wml';
import { LayoutAttrs, AbstractLayout } from '../';
export declare const MAIN_LAYOUT = "ww-main-layout";
/**
 * MainAttrs
 */
export interface MainAttrs extends LayoutAttrs {
}
/**
 * MainLayout provides a container for the main content of an application.
 */
export declare class MainLayout extends AbstractLayout<MainAttrs> {
    view: View;
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
