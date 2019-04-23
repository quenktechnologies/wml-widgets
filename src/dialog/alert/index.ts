import { View, Component } from '@quenk/wml';
import { DEFAULT, Style, getStyleClassName } from '../../content/style';
import { concat, getById } from '../../util';
import { HTMLElementAttrs, WidgetAttrs, getClassName, getId, text } from '../../';
import { Main } from './wml/alert';

export { Style }

///classNames:begin
export const ALERT = 'ww-alert';
///classNames:end

/**
 * AlertAttrs
 */
export interface AlertAttrs extends HTMLElementAttrs {

    /**
     * text to display in the alert.
     */
    text?: string

    /**
     * style to apply to the alert.
     */
    style?: Style,

    /**
     * closable if true will provide a button to close the alert.
     */
    closable?: boolean

}

/**
 * Alert is used for displaying important messages to users.
 */
export class Alert extends Component<WidgetAttrs<AlertAttrs>> {

    view: View = new Main(this);

    values = {

        wml: {

            id: 'alert'

        },

        id: getId(this.attrs),

        className: concat(ALERT,

            getClassName(this.attrs),

            (this.attrs.ww && this.attrs.ww.style) ?
                getStyleClassName(this.attrs.ww.style) :
                DEFAULT),

        closable: (this.attrs.ww && this.attrs.ww.closable) ?
            this.attrs.ww.closable : false,

        content: (this.attrs.ww && this.attrs.ww.text) ?
            [text(this.attrs.ww.text)] : this.children

    }

    /**
     * close the alert.
     */
  close(): void {

        let mRoot = getById<HTMLElement>(this.view, this.values.wml.id);

        if (mRoot.isJust()) {

            let root = mRoot.get();

            if (root.parentNode)
                root.parentNode.removeChild(root);

        }

    }

}
