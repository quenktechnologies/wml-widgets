import {ButtonGroupPageView} from './view';

export class ButtonGroupPage {

    view = new ButtonGroupPageView(this);

    onClick = (msg: string) => () => alert(msg);

    items = [

        { type: 'link', text: 'Link1', onClick: this.onClick('Link 1 !') },
        { type: 'link', text: 'Link2', onClick: this.onClick('Link 2 !') },
        { type: 'link', text: 'Link3', onClick: this.onClick('Link 3 !') },
        { type: 'divider' },
        { type: 'link', text: 'Link4', onClick: this.onClick('Link 4 !') },

    ];

}

export default new ButtonGroupPage()
