import * as $wml from '@quenk/wml';
import {
    App
} from '../../app';

export class PanelScreen extends $wml.AppView < App > {

    constructor(context: App) {

        super(context);

        this.template = (___context: App, ___view: $wml.AppView < App > ) =>
            $wml.node('b', {
                html: {},
                wml: {}
            }, [$wml.text(`Panel`)], ___view);

    }

}