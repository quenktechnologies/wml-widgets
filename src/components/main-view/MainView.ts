import { AbstractWidget, Renderable } from '@quenk/wml/lib/runtime';
import { replaceContent } from 'wml-widgets-common/util';
import { Main } from './wml/main-view';

/**
 * MainView provides a container for the main content of an application.
 */
export class MainView extends AbstractWidget {

    view = new Main(this);

    /**
     * setContent replaces the content of this view.
     */
    setContent(r: Renderable): MainView {

        replaceContent(r, <Node>this.view.findById('content'));
        return this;

    }

}


