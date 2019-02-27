import * as wml from '@quenk/wml';
import * as views from './wml/native-select'
import { Option, SelectionChangedEvent } from '../../../../../lib/control/native/select';

export class NativeSelectPage {

    view: wml.View = new views.Main(this);

    values = {

        options: <Option<string>[]>[
            { title: 'Asus', value: 'Asus' },
            { title: 'MSI', value: 'MSI' },
            { title: 'Gigabyte', value: 'Gigabyte' }]

    };

    onChange: (e: SelectionChangedEvent<string>) => void =
        ({ value, name }: SelectionChangedEvent<string>) => {

            this
                .view
            .findById<HTMLElement>(`${name}-content`)
                .map((e: HTMLElement) => {

                    while (e.lastChild)
                        e.removeChild(e.lastChild);

                    e.appendChild(document.createTextNode(String(value)));

                });

        }

}

export default new NativeSelectPage()
