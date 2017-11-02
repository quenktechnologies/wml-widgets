import { Component, Renderable, Content, Attrs } from '@quenk/wml-runtime';

/**
 * GroupAttrs
 */
export interface GroupAttrs extends Attrs {

    ww?: {

        /**
         * content allows the content of a Group to passed
         * via attributes.
         */
        content?: Renderable

    }

}

/**
 * Group is an abstract class providing an api for
 * widgets whose primary purpose is displaying content.
 */
export abstract class Group<A extends Attrs> extends Component<A> {

    /**
     * content is dynamic content that can be changed 
     * after the Widget has been rendered. It's up
     * to the respective template to utilize this property or ignore it.
     */
    content: Content;

    /**
     * setContent changes the content value.
     */
    setContent(content: Content): Group<A> {

        this.content = content;
        this.view.invalidate();
      return this;

    }

    /**
     * removeContent removes existing content. 
     */
    removeContent(): Group<A> {

        this.content = null;

        return this;

    }

}




