import { Component, View, Content } from '@quenk/wml';
import { HTMLElementAttrs, WidgetAttrs } from '../';
export declare const LAYOUT = "-layout";
/**
 * LayoutAttrs
 */
export interface LayoutAttrs extends HTMLElementAttrs {
}
/**
 * Layout is the parent class of all layout widgets.
 *
 * Layouts are used to visually display and line up content.
 */
export interface Layout {
    /**
     * setContent changes the content value.
     */
    setContent(content: Content[]): Layout;
    /**
     * removeContent removes existing content.
     */
    removeContent(): Layout;
}
/**
 * AbstractLayout provides an implementation of Layout.
 */
export declare abstract class AbstractLayout<A extends LayoutAttrs> extends Component<WidgetAttrs<A>> implements Layout {
    /**
     * view for the AbstractLayout.
     */
    abstract view: View;
    /**
     * values available to the View's template.
     */
    abstract values: {
        content: {
            wml: {
                id: string;
            };
        };
    };
    setContent(c: Content[]): AbstractLayout<A>;
    removeContent(): AbstractLayout<A>;
}
/**
 * doSetContent on a Node found in a view.
 */
export declare const doSetContent: (view: View, id: string, content: Content[]) => void;
/**
 * doRemoveContent from a View.
 */
export declare const doRemoveContent: (view: View, id: string) => void;
