import { Component, Attrs, Renderable } from '@quenk/wml-runtime';
import { Main } from './wml/main-view';
export interface MainViewAttrs extends Attrs {
    ww?: {
        class?: string;
    };
}
/**
 * MainView provides a container for the main content of an application.
 */
export declare class MainView extends Component<MainViewAttrs> {
    view: Main<this>;
    /**
     * setContent replaces the content of this view.
     */
    setContent(r: Renderable): MainView;
}
