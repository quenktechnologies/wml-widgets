import * as wml from '@quenk/wml';
import * as views from './wml/tab';
import { TabSpecMap } from '../../../../../lib/layout/tab';

export class TabLayoutPage {
    view: wml.View = new views.Main(this);

    tabs: TabSpecMap = {
        first: {
            text: 'First',

            contentFun: views.firstTab
        },
        second: {
            text: 'Second',

            contentFun: views.secondTab
        },
        third: {
            text: 'Third',

            contentFun: views.thirdTab
        }
    };
}

export default new TabLayoutPage();
