import { Component, Renderable, Content, Attrs } from '@quenk/wml';
/**
 * GroupAttrs
 */
export interface GroupAttrs extends Attrs {
    ww?: {
        /**
         * content allows the content of a Group to passed
         * via attributes.
         */
        content?: Renderable;
    };
}
/**
 * Group is an abstract class providing an api for
 * widgets whose primary purpose is displaying content.
 */
export declare abstract class Group<A extends Attrs> extends Component<A> {
    /**
     * content is dynamic content that can be changed
     * after the Widget has been rendered. It's up
     * to the respective template to utilize this property or ignore it.
     */
    content: Content;
    /**
     * setContent changes the content value.
     */
    setContent(content: Content): Group<A>;
    /**
     * removeContent removes existing content.
     */
    removeContent(): Group<A>;
}
