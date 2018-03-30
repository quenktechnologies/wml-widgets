import * as wml from '@quenk/wml';
import { Page } from '../Page';
import { DateChangedEvent } from '../../../../lib/control/date';
export declare class DatePage extends Page {
    view: wml.View;
    onChange: ({ value }: DateChangedEvent) => void;
}
