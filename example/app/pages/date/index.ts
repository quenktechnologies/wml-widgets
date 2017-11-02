import * as wml from '@quenk/wml';
import * as views from './wml/date'
import { Page } from '../Page';
import { DateChangedEvent } from '@package/self/control/date';

export class DatePage extends Page {

    view: wml.View = new views.Main(this);

    onChange = ({ value }: DateChangedEvent) => {

        this
            .view
            .findById('selected')
            .map((e: HTMLElement) => {

                while (e.lastChild)
                    e.removeChild(e.lastChild);

                e.appendChild(document.createTextNode(value));


            });


    }


}
