import * as wml from '@quenk/wml';
import * as views from './wml/tab-bar';
import { TabClickedEvent } from '../../../../lib/control/tab-bar';
import { Page } from '../Page';

export class TabBarPage extends Page {

    view: wml.View = new views.Main(this);

    tab = 'First';

    content = 'First Tab';

    clicked = ({ name }: TabClickedEvent) => {

        this.tab = name;
        this.content = `${name} Tab`;
        this.view.invalidate();


    }

}
