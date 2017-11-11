import * as wml from '@quenk/wml';
/**
 * GroupAttrs
 */
export interface GroupAttrs extends wml.Attrs {
    ww?: {
        /**
         * class name to apply to the rendered DOM.
         */
        class?: string;
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
export declare class Group extends wml.Component<GroupAttrs> {
    view: wml.View;
    /**
     * content is dynamic content that can be changed
     * after the Widget has been rendered. It's up
     * to the respective template to utilize this property or ignore it.
     */
    content: wml.Content;
    values: {
        root: {
            id: string;
            class: string;
            content: wml.Renderable | wml.Content[];
        };
    };
    /**
     * setContent changes the content displayed.
     */
    setContent(content: wml.Content): Group;
}
