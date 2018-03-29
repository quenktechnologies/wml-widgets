import * as wml from '@quenk/wml';
import { CheckboxChangedEvent } from '@package/wml-widgets/control/checkbox/CheckboxChangedEvent';
import { Page } from '../Page';
export declare class CheckboxPage extends Page {
    view: wml.View;
    value: boolean;
    onChange: ({value}: CheckboxChangedEvent) => void;
}
