import * as wml from '@quenk/wml';
import * as views from './wml/sub-menu';
import { Menu } from './Menu';

/**
 * SubMenu is used for nested menus.
 */
export class SubMenu extends Menu {

    view: wml.View = new views.Main(this);

}
