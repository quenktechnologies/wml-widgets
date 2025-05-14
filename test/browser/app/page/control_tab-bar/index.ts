import * as wml from '@quenk/wml';
import * as views from './wml/tab-bar';
import { TabClickedEvent } from '../../../../../lib/control/tab-bar';

export class TabBarPage {
    view: wml.View = new views.Main(this);

    tab = 'First';

    content = document.createTextNode('First Tab');

    clicked = ({ name }: TabClickedEvent) => {
        this.tab = name;
        this.content = document.createTextNode(`${name} Tab`);
        this.view.invalidate();
    };
}

export default new TabBarPage();
