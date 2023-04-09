import { Component } from '@quenk/wml';

import { TOOLBAR_COMPAT } from '../toolbar';
import { DISABLED } from '../../content/state/disabled';
import { concat } from '../../util';
import { getClassName, getId, HTMLElementAttrs, } from '../../';
import { TextFacadeView } from './views';

///classNames:begin
export const TEXT_FACADE = 'ww-text-facade';
export const TEXT_FACADE_CONTENT = 'ww-text-facade-content';
///classNames:end

/**
 * TextFacadeAttrs
 */
export interface TextFacadeAttrs extends HTMLElementAttrs {
    /**
     * disabled
     */
    disabled?: boolean,

    /**
     * onClick handler.
     */
    onClick?: () => void

};

/**
 * TextFacade is used to display a value in a text input like box.
 */
export class TextFacade
    extends
    Component<TextFacadeAttrs> {

    view = new TextFacadeView(this);

    id = getId(this.attrs);

    disabled = this.attrs.disabled;

    className = concat(TEXT_FACADE,

        getClassName(this.attrs),

        TOOLBAR_COMPAT,

        this.attrs.disabled ? DISABLED : ''
    );

    onclick = (e: Event) => {

        if (this.attrs.onClick) {

            e.preventDefault();

            if (!this.disabled)
                this.attrs.onClick();

        }

    }

    content = {

        className: TEXT_FACADE_CONTENT

    };

}
