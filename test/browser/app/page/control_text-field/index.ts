import * as wml from '@quenk/wml';
import * as views from './wml/text-field';
import { ValidationState } from '../../../../../lib/control/feedback';
import {
    TextChangedEvent,
    TextField
} from '../../../../../lib/control/text-field';

export class TextFieldPage {
    id = 'text';

    view: wml.View = new views.Main(this);

    onChange = ({ name, value }: TextChangedEvent) => {
        let maybeField = this.view.findById<TextField>(name);

        if (maybeField.isJust()) {
            let t = maybeField.get();

            switch (value) {
                case 'neutral':
                    t.setValidationState(ValidationState.Neutral);
                    break;

                case 'error':
                    t.setValidationState(ValidationState.Error);
                    break;

                case 'success':
                    t.setValidationState(ValidationState.Success);
                    break;

                case 'warning':
                    t.setValidationState(ValidationState.Warning);
                    break;

                default:
                    break;
            }

            t.setMessage(`Message: ${value}`);
        }
    };
}

export default new TextFieldPage();
