import * as wml from '@quenk/wml';
import * as views from './wml/date-field'
import { DateChangedEvent } from '../../../../../lib/control/date-field';

export class DateFieldPage {

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

export default new DateFieldPage();
