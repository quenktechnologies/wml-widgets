import { Component, Attrs } from '@quenk/wml-runtime';
import { TreeNavView, TreeNavItemView } from './wml/tree-nav';
export interface TreeNavItemAttrs extends Attrs {
    ww: {
        name: string;
        onClick: (s: string) => void;
    };
}
/**
 * TreeNavItem is used to indicate an item in the tree.
 */
export declare class TreeNavItem extends Component<TreeNavItemAttrs> {
    view: TreeNavItemView<this>;
    /**
     * activate this TreeItem
     */
    activate(): void;
    /**
     * deactivate this DrawerLink
     */
    deactivate(): void;
}
export interface TreeAttrs extends Attrs {
}
/**
 * TreeNav provides an api for displaying a tree of links.
 */
export declare class TreeNav extends Component<TreeAttrs> {
    view: TreeNavView<this>;
    handleEvent(e: Event): void;
    rendered(): void;
}
