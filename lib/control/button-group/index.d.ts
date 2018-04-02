import * as wml from '@quenk/wml';
export { ButtonGroup } from './ButtonGroup';
/**
 * ButtonGroupAttrs are the allowed attributes for <Group/>
 */
export interface ButtonGroupAttrs extends wml.Attrs {
    /**
     * ww attributes
     */
    ww?: {
        /**
         * class names to append to the root element.
         */
        class?: string;
        /**
         * content can be specified instead of the children attribute.
         */
        content?: wml.Renderable;
    };
}
