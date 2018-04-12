import { Maybe } from 'afpl/lib/monad/Maybe';
import { Component, View, Content } from '@quenk/wml';
import { StylableAttrs, WidgetAttrs } from '../';

const _get = <A extends LayoutAttrs>(gen: GenericLayout<A>) => () =>
    gen
        .view
        .findById<HTMLElement>(gen.values.content.id);

/**
 * SetContent
 */
export type SetContent<L extends Layout>
    = (content: Content) => L
    ;

/**
 * RemoveContent
 */
export type RemoveContent<L extends Layout>
    = () => L
    ;

/**
 * LayoutAttrs
 */
export interface LayoutAttrs extends StylableAttrs { }

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
export abstract class GenericLayout<A extends LayoutAttrs>
    extends Component<WidgetAttrs<A>>
    implements Layout {

    /**
     * view for the GenericLayout.
     */
    abstract view: View;

    /**
     * values available to the View's template.
     */
    abstract values: { content: { id: string } }

    setContent: SetContent<this> = setContent(this)(_get(this));

    removeContent: RemoveContent<this> =        removeContent(this)(_get(this));

}

/**
 * setContent helper.
 */
export const setContent = <L extends Layout>
    (l: L) => (fn: () => Maybe<HTMLElement>): SetContent<L> => (content: Content) =>
        fn()
            .map(e => {

                while (e.firstChild)
                    e.removeChild(e.firstChild);

                e.appendChild(content);

            })
            .map(() => l)
            .orJust(() => l)
            .get();

/**
 * removeContent helper.
 */
export const removeContent = <L extends Layout>
    (l: L) => (fn: () => Maybe<HTMLElement>): RemoveContent<L> => () =>
        fn()
            .map(e => { while (e.firstChild) e.removeChild(e.firstChild); })
            .map(() => l)
            .orJust(() => l)
            .get();
