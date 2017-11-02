import * as wml from '@quenk/wml';
import { ButtonMenuAttrs } from './ButtonMenuAttrs';
import { ButtonTemplate } from './ButtonTemplate';
/**
 * ButtonMenu
 */
export declare class ButtonMenu extends wml.Component<ButtonMenuAttrs> {
    view: wml.View;
    _buttonTemplate: ButtonTemplate;
    values: {
        id: {
            root: string;
            target: string;
        };
        root: {
            class: string;
        };
        button: {
            text: string;
            template: ButtonTemplate;
            class: string;
            onClick: () => void;
        };
        menu: {
            id: string;
            content: wml.Content[];
        };
    };
    /**
     * hide the menu.
     */
    hide(): ButtonMenu;
    /**
     * show the menu.
     */
    show(): ButtonMenu;
    /**
     * toggle the menu.
     */
    toggle(): ButtonMenu;
    /**
     * setContent of this menu.
     */
    setContent(view: wml.Renderable): ButtonMenu;
}
