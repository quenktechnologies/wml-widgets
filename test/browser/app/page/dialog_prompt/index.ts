import * as wml from '@quenk/wml';
import * as views from './wml/prompt';
import { Prompt } from '../../../../../lib/dialog/prompt';
import { TextChangedEvent } from '../../../../../lib/control/text-field';

export class PromptPage {
    view: wml.View = new views.Main(this);

    v: wml.View = new views.Open(this);

    values = {
        value: 'Click the button bellow to change this text.',

        title: 'Change the text',

        onChange: (e: TextChangedEvent) => (this.values.value = e.value),

        onSave: () => {
            this.view.invalidate();
        },

        onCancel: () => {},

        open: () => {
            document.body.appendChild(<Node>this.v.render());
        },

        close: () => {
            this.v.findById<Prompt>('open').map(m => m.close());
        }
    };
}

export default new PromptPage();
