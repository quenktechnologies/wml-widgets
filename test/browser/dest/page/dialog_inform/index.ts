import * as wml from '@quenk/wml';
import * as views from './wml/inform';
import { Inform } from '../../../../../lib/dialog/inform';

export class InformPage {

    view: wml.View = new views.Main(this);

    v: wml.View = new views.Open(this);

    values = {

        title: 'Something happened',

        message: 'Zing! Something you happened!',

        onClose: () => {

            alert('Buh Bye');

        },

        open: () => {

            document.body.appendChild(this.v.render());

        },

        close: () => {

            this.v.findById<Inform>('open')
                .map(m => m.close());

        }

    }

}

export default new InformPage();
