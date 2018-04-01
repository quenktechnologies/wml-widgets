import * as names from './classNames';
import { Component, Attrs, View } from '@quenk/wml';
import { concat } from '../../util';
import { Control, ControlAttrsProperties, Event } from '../';
import { Main } from './wml/icon-button';

/**
 * IconButtonAttrsProperties
 */
export interface IconButtonAttrsProperties extends ControlAttrsProperties {

    /**
     * onClick is called when the user clicks on the menu button.
     */
    onClick?: (e: Event<void>) => void,

}

/**
 * IconButtonAttrs
 */
export interface IconButtonAttrs extends Attrs {

    ww: IconButtonAttrsProperties;

}

/**
 * IconButtonClickedEvent triggered when an icon button is clicked.
 */
export class IconButtonClickedEvent extends Event<void> { }

/**
 * IconButton provides a button with limited styling that displays
 * an icon for its UI.
 *
 *  +---------+
 *  | <= * => | 
 *  +---------+ 
 */
export class IconButton extends Component<IconButtonAttrs> implements
    Control<IconButtonAttrs> {

    view: View = new Main(this);

    values = {

        class: {

            root: names.ICON_BUTTON

        },
        button: {

            class: concat(names.ICON_BUTTON, (this.attrs.ww && this.attrs.ww.class) ?
                this.attrs.ww.class : ''),

            onClick: () => {

                if (this.attrs.ww && this.attrs.ww.onClick)
                    this.attrs.ww.onClick(
                        new IconButtonClickedEvent(this.attrs.ww.name, undefined));

            }

        }

    };

}
