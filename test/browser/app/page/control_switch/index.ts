import * as wml from '@quenk/wml';
import * as views from './wml/switch';
import { SwitchChangedEvent } from '../../../../../lib/control/switch';

export class SwitchPage {
    view: wml.View = new views.Main(this);

    value: boolean = true;

    onChange = ({ value }: SwitchChangedEvent) => {
        this.view.findById<HTMLElement>('content').map((e: HTMLElement) => {
            while (e.firstChild) e.removeChild(e.firstChild);

            e.appendChild(
                document.createTextNode(
                    value === true ? 'on' : value === false ? 'off' : 'error'
                )
            );
        });
    };
}

export default new SwitchPage();
