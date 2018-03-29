import * as wml from '@quenk/wml';
import { TabSpecMap } from '@package/wml-widgets/layout/tab-view';
import { Page } from '../Page';
export declare class TabViewPage extends Page {
    view: wml.View;
    tabs: TabSpecMap;
}
