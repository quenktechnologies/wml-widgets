import * as wml from '@quenk/wml';
import * as names from '../../common/names';
import * as views from './wml/button-menu';
import { concat } from '../../util';
import { Menu } from '../../menu';
import { ButtonMenuAttrs } from './ButtonMenuAttrs';
import { ButtonTemplate } from './ButtonTemplate';

/**
 * ButtonMenu 
 */
export class ButtonMenu extends wml.Component<ButtonMenuAttrs>{

    view: wml.View = new views.Main(this);

    _buttonTemplate: ButtonTemplate = this.attrs.ww.buttonTemplate ?
        this.attrs.ww.buttonTemplate : views.button;

    values = {

        id: {

            root: 'root',
            target: 'menu'

        },
        root: {

            class: concat(names.BUTTON_MENU,(this.attrs.ww && this.attrs.ww.class) ?
                this.attrs.ww.class : '')

        },
        button: {

            text: this.attrs.ww.text ? this.attrs.ww.text : '',
            template: this._buttonTemplate,
            class: names.BUTTON_MENU_BUTTON,
            onClick: () =>
            { this.view.findById(this.values.menu.id).map((m: Menu) => m.toggle()); }


        },
        menu: {

            id: 'menu',
            content: this.attrs.ww.content ? this.attrs.ww.content : this.children

        }
    };

    /**
     * hide the menu.
     */
    hide(): ButtonMenu {

        this.view.findById(this.values.menu.id)
            .map((m: Menu) => m.hide());
        return this;

    }

    /**
     * show the menu.
     */
    show(): ButtonMenu {

        this.view.findById(this.values.menu.id)
            .map((m: Menu) => m.show());

        return this;

    }

    /**
     * toggle the menu.
     */
    toggle(): ButtonMenu {

        this.view.findById(this.values.menu.id)
            .map((m: Menu) => m.toggle());

        return this;

    }

    /**
     * setContent of this menu.
     */
    setContent(view: wml.Renderable): ButtonMenu {

        this.values.menu.content = [view.render()];
        this.view.invalidate();
        return this;

    }

}
