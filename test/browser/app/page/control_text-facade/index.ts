import { TextFacade } from '../../../../../lib/control/text-facade';
import { TextFacadePageView } from './view';

const messages = [
    { type: 'set', text: 'This is a plain message.' },
    { type: 'error', text: 'Something went wrong.' },
    { type: 'warning', text: 'Proceed with caution.' },
    { type: 'success', text: 'All good!' },
    { type: 'remove', text: '' }
];

export class TextFacadePage {
    view = new TextFacadePageView(this);

    private _cycle = 0;

    values = {
        programmatic: {
            id: 'programmatic',
            onClick: () => {
                this.view
                    .findById<TextFacade>(this.values.programmatic.id)
                    .map(facade => {
                        const step = messages[this._cycle % messages.length];
                        this._cycle++;
                        if (step.type === 'remove') {
                            facade.removeMessage();
                        } else {
                            facade.setMessage(step.text);
                        }
                    });
            }
        }
    };
}

export default new TextFacadePage();
