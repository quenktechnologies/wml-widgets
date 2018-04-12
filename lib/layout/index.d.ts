import { Maybe } from 'afpl/lib/monad/Maybe';
import { Component, View, Content } from '@quenk/wml';
import { StylableAttrs, WidgetAttrs } from '../';
/**
 * SetContent
 */
export declare type SetContent<L extends Layout> = (content: Content) => L;
/**
 * RemoveContent
 */
export declare type RemoveContent<L extends Layout> = () => L;
/**
 * LayoutAttrs
 */
export interface LayoutAttrs extends StylableAttrs {
}
/**
 * Layout is the parent class of all layout widgets.
 *
 * Typically a layout widget is used to display a set of
 * other widgets with little to no functionality on itself beyond
 * styling.
 */
export interface Layout {
    /**
     * setContent changes the content value.
     */
    setContent: (content: Content) => Layout;
    /**
     * removeContent removes existing content.
     */
    removeContent: () => Layout;
}
/**
 * GenericLayout provides an implementation of Layout.
 */
export declare abstract class GenericLayout<A extends LayoutAttrs> extends Component<WidgetAttrs<A>> implements Layout {
    /**
     * view for the GenericLayout.
     */
    abstract view: View;
    /**
     * values available to the View's template.
     */
    abstract values: {
        content: {
            id: string;
        };
    };
    setContent: SetContent<this>;
    removeContent: RemoveContent<this>;
}
/**
 * setContent helper.
 */
export declare const setContent: <L extends Layout>(l: L) => (fn: () => Maybe<HTMLElement>) => SetContent<L>;
/**
 * removeContent helper.
 */
export declare const removeContent: <L extends Layout>(l: L) => (fn: () => Maybe<HTMLElement>) => RemoveContent<L>;
