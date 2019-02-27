import * as wml from '@quenk/wml';
import * as views from './wml/date'
import { DateChangedEvent } from '../../../../../lib/control/date';

export class DatePage {

    view: wml.View = new views.Main(this);

    onChange = ({ value }: DateChangedEvent) => {

        this
            .view
            .findById<HTMLElement>('selected')
            .map((e: HTMLElement) => {

                while (e.lastChild)
                    e.removeChild(e.lastChild);

                e.appendChild(document.createTextNode(value));


            });


    }


}

export default new DatePage();
