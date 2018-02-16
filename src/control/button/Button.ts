import * as wml from '@quenk/wml';
import * as views from './wml/button';
import classNames from './classNames';
import { ClassNameMap, styles, states } from '@package/wml-widgets/util/class-names';
import { concat } from '@package/wml-widgets/util';
import { ButtonAttrs, ButtonClickedEvent } from '.';

/**
 * Button is an improvement over HTMLButtionElement
 */
export class Button extends wml.Component<ButtonAttrs> {

    view: wml.View = new views.Main(this);

    /**
     * NAME
     */
    static CLASSNAME = classNames.BUTTON;

    /**
     * styles the Button supports.
     */
    static styles: ClassNameMap = styles;

    values = {

        button: {

            id: 'button',

            class: this.attrs.ww ?
                concat(Button.CLASSNAME,
                    this.attrs.ww.class,
                    this.attrs.ww.style || Button.styles.DEFAULT,
                    this.attrs.ww.active && states.ACTIVE) :
                Button.CLASSNAME,

            type: (this.attrs.ww && this.attrs.ww.type) ? this.attrs.ww.type : 'button',

            name: (this.attrs.ww && this.attrs.ww.name) ? this.attrs.ww.name : '',

            disabled: (this.attrs.ww && this.attrs.ww.disabled) ? this.attrs.ww.disabled : null,

            onclick: () => this.attrs.ww &&
                this.attrs.ww.onClick &&
                this.attrs.ww.onClick(new ButtonClickedEvent(this.attrs.ww.name || '')),

            text: (this.attrs.ww && this.attrs.ww.text) ? this.attrs.ww.text : ''

        }

    };

    /**
     * disable this button.
     */
    disable(): void {

        this
            .view
            .findById(this.values.button.id)
            .map((b: HTMLButtonElement) => b.setAttribute('disabled', 'disabled'));

    }

    /**
     * enable this button.
     */
    enable(): void {

        this
            .view
            .findById(this.values.button.id)
            .map((b: HTMLButtonElement) => b.removeAttribute('disabled'));

    }

    /**
     * toggle the disabled state of this button.
     */
    toggle() {

        this
            .view
            .findById(this.values.button.id)
            .map((b: HTMLButtonElement) => b.hasAttribute('disabled') ?
                this.enable() :
                this.disable());

    }

}
