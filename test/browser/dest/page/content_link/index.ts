import * as wml from '@quenk/wml';
import * as views from './views';

let linkStates = ['-default', '-primary', '-warning', '-error'];

export class LinkPage {

    view: wml.View = new views.Main(this);

    values = {

        onClick: () => alert('You clicked me?'),

        currentLinkState: 0,

        getState: () => linkStates[this.values.currentLinkState],

        onLinkClick: () => {

            this.values.currentLinkState++;

            if (this.values.currentLinkState >= linkStates.length)
                this.values.currentLinkState = 0;

            this.view.invalidate();

        }

    }

}

export default new LinkPage();
