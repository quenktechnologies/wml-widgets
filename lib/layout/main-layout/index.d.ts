import { View, Renderable } from '@quenk/wml';
import { GroupAttrs, Group } from '../../content/Group';
export interface MainAttrs extends GroupAttrs {
    ww?: {
        class?: string;
        content: Renderable;
    };
}
/**
 * MainLayout provides a container for the main content of an application.
 */
export declare class MainLayout extends Group<MainAttrs> {
    view: View;
    values: {
        root: {
            class: string;
        };
    };
}
