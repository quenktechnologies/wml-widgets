import * as wml from '@quenk/wml';
import * as views from './wml/button-select';
import {
    Option,
    ButtonChangedEvent
} from '../../../../../lib/control/button-select';

export class ButtonSelectPage {
    view: wml.View = new views.Main(this);

    values = {
        options: <Option<string>[]>[
            { text: 'Asus', value: 'Asus' },
            { text: 'MSI', value: 'MSI' },
            { text: 'Gigabyte', value: 'Gigabyte' }
        ],

        value: 'MSI',

        values: ['MSI']
    };

    onChange: (e: ButtonChangedEvent<string>) => void = ({
        value,
        name
    }: ButtonChangedEvent<string>) => {
        this.view
            .findById<HTMLElement>(`${name}-content`)
            .map((e: HTMLElement) => {
                while (e.lastChild) e.removeChild(e.lastChild);

                e.appendChild(document.createTextNode(String(value)));
            });
    };

    onChangeMulti: (e: ButtonChangedEvent<string[]>) => void = ({
        value,
        name
    }: ButtonChangedEvent<string[]>) => {
        this.view
            .findById<HTMLElement>(`${name}-content`)
            .map((e: HTMLElement) => {
                while (e.lastChild) e.removeChild(e.lastChild);

                e.appendChild(document.createTextNode(String(value)));
            });
    };
}

export default new ButtonSelectPage();
