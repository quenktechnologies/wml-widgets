import * as wml from '@quenk/wml';
import * as views from './wml/confirm';
import { Confirm } from '../../../../../lib/dialog/confirm';

export class ConfirmPage {

    view: wml.View = new views.Main(this);

    v: wml.View = new views.Open(this);

    values = {

        title: 'Confirm a message',

        message: 'Would you like to confirm this message?',

        onYes: () => {

            alert('Message confirmed!');

        },

        onNo: () => {

            alert('Message rejected!');

        },

        open: () => {

            document.body.appendChild(<Node>this.v.render());

        },

        close: () => {

            this.v.findById<Confirm>('open')
                .map(m => m.close());

        }

    }

}

export default new ConfirmPage();
