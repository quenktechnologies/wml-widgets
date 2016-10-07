import { View } from 'wmljs/lib/runtime';
import layout from './wml/layout.wml';

const context = {

    menuButtonClicked() {

        window.watLayout.findById('drawer').toggle();

    }

};

window.watLayout = new View(layout, context);
document.body.insertBefore(watLayout.render(), document.body.firstChild);
