import { Maybe } from '@quenk/noni/lib/data/maybe';
import { Component, View, Content } from '@quenk/wml';
import { warnMissing } from '../util';
import { HTMLElementAttrs,  } from '../';

///classNames:begin
export const LAYOUT = '-layout';
///classNames:end

/**
 * LayoutAttrs
 */
export interface LayoutAttrs extends HTMLElementAttrs { }

/**
 * Layout is the parent class of all layout widgets.
 *
 * Layouts are used to visually display and line up content.
 */
export interface Layout {

    /**
     * setContent changes the content value.
     */
    setContent(content: Content|Content[]): Layout;

    /**
     * removeContent removes existing content. 
     */
    removeContent(): Layout;

}

/**
 * AbstractLayout provides an implementation of Layout.
 */
export abstract class AbstractLayout<A extends LayoutAttrs>
    extends Component<A> implements Layout {

    /**
     * view for the AbstractLayout.
     */
    abstract view: View;

    /**
     * values available to the View's template.
     */
    abstract values: { content: { wml: { id: string } } }

    setContent(c: Content|Content[]): AbstractLayout<A> {

        doSetContent(this.view, this.values.content.wml.id, c);
        return this;

    }

    removeContent(): AbstractLayout<A> {

        doRemoveContent(this.view, this.values.content.wml.id);
        return this;

    }

}

/**
 * doSetContent on a Node found in a view.
 */
export const doSetContent = 
  (view: View, id: string, content: Content|Content[]) => {

    let maybeRoot: Maybe<Node> = view.findById(id);

    if (maybeRoot.isNothing())
        return warnMissing(view, id);

    let n = maybeRoot.get();

    while (n.firstChild)
        n.removeChild(n.firstChild);

    content = Array.isArray(content) ? content : [content];

    for (let i = 0; i < content.length; i++)
        n.appendChild(<Node>content[i]);

}

/**
 * doRemoveContent from a View.
 */
export const doRemoveContent = (view: View, id: string) => {

    let maybeNode: Maybe<Node> = view.findById(id);

    if (maybeNode.isNothing())
        return warnMissing(view, id);

    let n = maybeNode.get();

    while (n.firstChild)
        n.removeChild(n.firstChild);

}
