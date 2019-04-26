import { View, Component } from '@quenk/wml';
import { concat, getById } from '../../util';
import { HTMLElementAttrs, WidgetAttrs, getClassName, getId } from '../../';
import { Main } from './wml/overlay';

///classNames:begin
export const OVERLAY = 'ww-overlay';
///classNames:end

/**
 * OverlayAttrs
 */
export interface OverlayAttrs extends HTMLElementAttrs {

    /**
     * onClick handler.
     */
    onClick?: () => void

}

/**
 * Overlay
 */
export class Overlay extends Component<WidgetAttrs<OverlayAttrs>> {

    view: View = new Main(this);

    values = {

        wml: {

            id: 'root'

        },
        id: getId(this.attrs),

        className: concat(OVERLAY, getClassName(this.attrs)),

        onclick: () => {

            if (this.attrs.ww && this.attrs.ww.onClick) 
                this.attrs.ww.onClick();

        }

    }

    /**
     * close the overlay.
     */
    close(): void {

        let mO = getById<HTMLElement>(this.view, this.values.wml.id);

        if (mO.isJust()) {

            let n = mO.get();

            if (n.parentNode)
                n.parentNode.removeChild(n);

        }

    }

}
