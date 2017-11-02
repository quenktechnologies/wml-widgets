import * as wml from '@quenk/wml';
import { ButtonTemplate } from './ButtonTemplate';

export interface ButtonMenuAttrs extends wml.Attrs {

    ww?: {

        /**
         * text for the button.
         */
        text?: string,

        /**
         * class styles for the root element (ul).
         */
        class?: string,

        /**
         * buttonTemplate
         */
        buttonTemplate?: ButtonTemplate

      /**
       * content to display in the menu.
       */
      content?: wml.Content[]

    }

}

