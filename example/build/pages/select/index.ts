import * as wml from '@quenk/wml';
import * as views from './wml/select'
import { Page } from '../Page';
import {SelectionChangedEvent} from '@package/self/control/select';

export class SelectPage extends Page {

    view: wml.View = new views.Main(this);

    values = {

        options: [
            { label: 'Asus', value: 'Asus' },
            { label: 'MSI', value: 'MSI' },
            { label: 'Gigabyte', value: 'Gigabyte' }]

    };

    onChange = ({value}: SelectionChangedEvent) => {

        this
            .view
            .findById('selected')
            .map((e: HTMLElement) => {

                while (e.lastChild)
                    e.removeChild(e.lastChild);

                e.appendChild(document.createTextNode(value));


            });


    }


}
