import * as wml from '@quenk/wml';
import * as views from './wml/group';
/**
 * GroupAttrs
 */
export interface GroupAttrs extends wml.Attrs {
    ww?: {
        /**
         * content allows the content of a Group to passed
         * via attributes.
         */
        content?: wml.Renderable;
    };
}
/**
 * Group is a generic container for child content.
 */
export declare abstract class Group extends wml.Component<GroupAttrs> {
    view: views.Main;
    /**
     * content is dynamic content that can be changed
     * after the Widget has been rendered. It's up
     * to the respective template to utilize this property or ignore it.
     */
    content: wml.Content;
    values: {
        root: {
            id: string;
            content: wml.Renderable | wml.Content[];
        };
    };
    /**
     * setContent changes the content displayed.
     */
    setContent(content: wml.Content): Group;
}
