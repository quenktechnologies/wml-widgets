import * as wml from '@quenk/wml';
import * as views from './wml/tab-layout'
import { TabSpecMap } from '../../../../lib/layout/tab-layout';
import { Page } from '../Page';

export class TabLayoutPage extends Page {

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
