import * as wml from '@quenk/wml';
import { ButtonClickedEvent } from './ButtonClickedEvent';
export { Button } from './Button';
export { ButtonClickedEvent };
/**
 * ButtonAttrs
 */
export interface ButtonAttrs extends wml.Attrs {
    /**
     * ww attributes.
     */
    ww?: {
        /**
      * size modifier for the button.
      */
        size?: string;
        /**
         * style assigns one of the supported styles.
         */
        style?: string;
        /**
         * class names that can be assigned to the button.
         */
        class?: string;
        /**
         * outline uses an alternative outline styling
         */
        outline?: boolean;
        /**
         * active indicates whether the button is active or not.
         */
        active?: boolean;
        /**
         * disabled indicates whether the button is disabled or not.
         */
        disabled?: boolean;
        /**
         * block scope this button.
         */
        block?: boolean;
        /**
         * onClick assigns a handler for click events.
         */
        onClick?: (e: ButtonClickedEvent) => void;
        /**
         * text can be specified as an alternative to explicit children.
         */
        text?: string;
        /**
         * type corresponds to the html attribute.
         */
        type?: string;
        /**
         * name of the button (used in event generation)
         */
        name?: string;
        /**
         * content
         * @deprecated
         */
        content?: wml.Renderable;
    };
}
