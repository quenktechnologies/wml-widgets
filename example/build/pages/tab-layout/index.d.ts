import * as wml from '@quenk/wml';
import { TabSpecMap } from '../../../../lib/layout/tab-layout';
import { Page } from '../Page';
export declare class TabLayoutPage extends Page {
    view: wml.View;
    tabs: TabSpecMap;
}
