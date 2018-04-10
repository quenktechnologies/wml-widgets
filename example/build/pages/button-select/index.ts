import * as wml from '@quenk/wml';
import * as views from './wml/button-select'
import { Option, ButtonChangedEvent } from '../../../../lib/control/button-select';
import { Page } from '../Page';

export class ButtonSelectPage extends Page {

    view: wml.View = new views.Main(this);

    values = {

        options: <Option<string>[]>[
            { title: 'Asus', value: 'Asus' },
            { title: 'MSI', value: 'MSI' },
            { title: 'Gigabyte', value: 'Gigabyte' }]

    };

    onChange: (e: ButtonChangedEvent<string>) => void =
        ({ value, name }: ButtonChangedEvent<string>) => {

            this
                .view
                .findById(`${name}-content`)
                .map((e: HTMLElement) => {

                    while (e.lastChild)
                        e.removeChild(e.lastChild);

                    e.appendChild(document.createTextNode(String(value)));

                });

        }

    onChangeMulti: (e: ButtonChangedEvent<string[]>) => void =
        ({ value, name }: ButtonChangedEvent<string[]>) => {

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
