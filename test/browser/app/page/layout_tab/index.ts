import * as wml from '@quenk/wml';
import * as views from './wml/tab';
import { TabSpecMap } from '../../../../../lib/layout/tab';

export class TabLayoutPage {
    view: wml.View = new views.Main(this);

    tabs: TabSpecMap = {
        first: {
            text: 'First',

            contentFun: ()=> new views.FirstTab()
        },
        second: {
            text: 'Second',

            contentFun: ()=> new views.SecondTab()
        },
        third: {
            text: 'Third',

            contentFun: ()=> new views.ThirdTab()
        }
    };
}

export default new TabLayoutPage();
