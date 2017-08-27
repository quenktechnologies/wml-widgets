import * as common from 'wml-widgets-common';
import { Attrs } from '@quenk/wml-runtime';
import { Main } from './wml/main-view';

export interface MainViewAttrs extends Attrs {

    ww?: { class?: string }

}

/**
 * MainView provides a container for the main content of an application.
 */
export class MainView extends common.Container<MainViewAttrs> {

    view = new Main(this);

}


