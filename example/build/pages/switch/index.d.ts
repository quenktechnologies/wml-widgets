import * as wml from '@quenk/wml';
import { SwitchChangedEvent } from '@package/wml-widgets/control/switch/SwitchChangedEvent';
import { Page } from '../Page';
export declare class SwitchPage extends Page {
    view: wml.View;
    value: boolean;
    onChange: ({value}: SwitchChangedEvent) => void;
}
