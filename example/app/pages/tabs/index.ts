import * as wml from '@quenk/wml';
import * as views from './wml/tabs'
import { TabClickedEvent } from '../../../../lib/control/tabs/TabClickedEvent';
import { Page } from '../Page';

export class TabsPage extends Page {

    view: wml.View = new views.Main(this);

    tab = 'First';

    content = 'First Tab';

    clicked = ({ name }: TabClickedEvent) => {

        this.tab = name;
        this.content = `${name} Tab`;
        this.view.invalidate();


    }

}
