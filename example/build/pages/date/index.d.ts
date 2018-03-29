import * as wml from '@quenk/wml';
import { Page } from '../Page';
import { DateChangedEvent } from '@package/wml-widgets/control/date';
export declare class DatePage extends Page {
    view: wml.View;
    onChange: ({value}: DateChangedEvent) => void;
}
