import * as views from './wml/main';
import { Renderable } from '@quenk/wml';
import { GroupAttrs, Group } from '../../content/Group';
export interface MainAttrs extends GroupAttrs {
    ww?: {
        class?: string;
        content: Renderable;
    };
}
/**
 * Main provides a container for the main content of an application.
 */
export declare class Main extends Group<MainAttrs> {
    view: views.Main;
    values: {
        class: {
            root: string;
        };
    };
}
