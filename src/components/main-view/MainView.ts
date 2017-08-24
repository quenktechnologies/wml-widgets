import { Component, Attrs, Renderable } from '@quenk/wml-runtime';
import { replaceContent } from 'wml-widgets-common/util';
import { Main } from './wml/main-view';

export interface MainViewAttrs extends Attrs {

    ww?: { class?: string }

}

/**
 * MainView provides a container for the main content of an application.
 */
export class MainView extends Component<MainViewAttrs> {

    view = new Main(this);

    /**
     * setContent replaces the content of this view.
     */
    setContent(r: Renderable): MainView {

        replaceContent(r, <Node>this.view.ids.root);
        return this;

    }

}


