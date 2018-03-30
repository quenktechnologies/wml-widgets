import * as wml from '@quenk/wml';
import * as views from './wml/checkbox'
import { CheckboxChangedEvent } from '../../../../lib/control/checkbox/CheckboxChangedEvent';
import { Page } from '../Page';

export class CheckboxPage extends Page {

    view: wml.View = new views.Main(this);

    value: boolean = true;

    onChange = ({ value }: CheckboxChangedEvent) => {

        this.view.findById('content')
            .map((e: HTMLElement) => {
                while (e.firstChild)
                    e.removeChild(e.firstChild);

                e.appendChild(
                    document.createTextNode(value === true ?
                        'on' :
                        (value === false ? 'off' : 'error')));

            });

    }


}
