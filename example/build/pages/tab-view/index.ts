import * as wml from '@quenk/wml';
import * as views from './wml/tab-view'
import { TabSpecMap } from '@package/wml-widgets/layout/tab-view';
import { Page } from '../Page';

export class TabViewPage extends Page {

    view: wml.View = new views.Main(this);

    tabs: TabSpecMap = {

        first: {

            view: new views.FirstTab(this)

        },
        second: {

            view: new views.SecondTab(this)

        },
        third: {

            view: new views.ThirdTab(this)

        }


    }

}
