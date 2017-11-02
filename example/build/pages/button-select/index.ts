import * as wml from '@quenk/wml';
import * as views from './wml/button-select'
import { ButtonChangedEvent } from '@package/self/control/button-select';
import { Page } from '../Page';

export class ButtonSelectPage extends Page {

    view: wml.View = new views.Main(this);

    values = {

        options: [
            { text: 'Asus', value: 'Asus' },
            { text: 'MSI', value: 'MSI' },
            { text: 'Gigabyte', value: 'Gigabyte' }]

    };

    onChange = ({ value, name }: ButtonChangedEvent<string | string[]>) => {

        this
            .view
            .findById(`${name}-content`)
            .map((e: HTMLElement) => {

                while (e.lastChild)
                    e.removeChild(e.lastChild);

                e.appendChild(document.createTextNode(String(value)));


            });


    }


}
