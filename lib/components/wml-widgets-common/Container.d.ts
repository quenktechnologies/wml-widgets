import { Component, Content } from '@quenk/wml-runtime';
/**
 * Container is an abstract class implementing widgets
 * that hold content as their primary purpose such
 * as a DrawerLayout or an object form 'grid'.
 */
export declare abstract class Container<A> extends Component<A> {
    /**
     * content is dynamic content that can be changed
     * after the Widget has been rendered. It's up
     * to the respective template to utilize this property or ignore it.
     */
    content: Content;
    /**
     * setContent changes the content value.
     */
    setContent(content: Content): Container<A>;
    /**
     * removeContent removes existing content.
     */
    removeContent(): Container<A>;
}
