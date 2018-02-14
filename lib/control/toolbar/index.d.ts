import * as wml from '@quenk/wml';
export { Toolbar } from './Toolbar';
/**
 * ToolbarAttrs
 */
export interface ToolbarAttrs extends wml.Attrs {
    /**
     * ww properties.
     */
    ww?: {
        /**
         * class names to add to the root element.
         */
        class?: string;
    };
}
