import * as wml from '@quenk/wml';
import { TabClickedEvent } from '@package/self/control/tabs/TabClickedEvent';
import { Page } from '../Page';
export declare class TabsPage extends Page {
    view: wml.View;
    tab: string;
    content: string;
    clicked: ({name}: TabClickedEvent) => void;
}
