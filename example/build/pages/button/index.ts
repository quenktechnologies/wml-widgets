import * as wml from '@quenk/wml';
import * as views from './wml/button'
import { Page } from '../Page';

export class ButtonPage extends Page {

    view: wml.View = new views.Main(this);

    values = {

      capitalize: (s: string) :string => `${s[0].toUpperCase()}${s.slice(1)}`,

        styles: {

            default: '-default',
            primary: '-primary',
            success: '-success',
            danger: '-danger',
            warning: '-warning',
            info: '-info',
            light: '-light',
            dark: '-light'

        }

    }

}
