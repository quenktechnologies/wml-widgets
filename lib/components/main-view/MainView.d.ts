import { AbstractWidget, Renderable } from '@quenk/wml/lib/runtime';
import { Main } from './wml/main-view';
/**
 * MainView provides a container for the main content of an application.
 */
export declare class MainView extends AbstractWidget {
    view: Main;
    /**
     * setContent replaces the content of this view.
     */
    setContent(r: Renderable): MainView;
}
