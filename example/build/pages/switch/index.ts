import * as wml from '@quenk/wml';
import * as views from './wml/switch'
import { SwitchChangedEvent } from '@package/wml-widgets/control/switch/SwitchChangedEvent';
import { Page } from '../Page';

export class SwitchPage extends Page {

    view: wml.View = new views.Main(this);

    value: boolean = true;

    onChange = ({ value }: SwitchChangedEvent) => {

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
