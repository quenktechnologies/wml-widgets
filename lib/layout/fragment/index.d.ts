import * as views from './wml/fragment';
import { Component, Attrs } from '@quenk/wml';
/**
 * Fragment allows for the grouping of widgets in a DocumentFragment.
 *
 * This is intended to facilitate view templates that do not have a single
 * root but instead generated multiple sibling content.
 */
export declare class Fragment extends Component<Attrs> {
    view: views.Main;
    render(): DocumentFragment;
}
