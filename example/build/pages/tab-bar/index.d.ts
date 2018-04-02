import * as wml from '@quenk/wml';
import { TabClickedEvent } from '../../../../lib/control/tab-bar';
import { Page } from '../Page';
export declare class TabBarPage extends Page {
    view: wml.View;
    tab: string;
    content: string;
    clicked: ({ name }: TabClickedEvent) => void;
}
