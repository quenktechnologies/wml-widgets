import * as wml from '@quenk/wml';
import * as views from './wml/tab-layout'
import { TabSpecMap } from '../../../../lib/layout/tab-layout';
import { Page } from '../Page';

export class TabLayoutPage extends Page {

    view: wml.View = new views.Main(this);

    tabs: TabSpecMap = {

        first: {

            contentTemplate: views.firstTab

        },
        second: {

            contentTemplate: views.secondTab

        },
        third: {

            contentTemplate: views.thirdTab

        }

    }

}
