import * as wml from '@quenk/wml';
import * as views from './wml/checkbox'
import { CheckChangedEvent } from '../../../../../lib/control/checkbox';

export class CheckboxPage {

    view: wml.View = new views.Main(this);

    value: boolean = true;

    onChange = ({ value }: CheckChangedEvent) => {

      this.view.findById<HTMLElement>('content')
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

export default new CheckboxPage()
