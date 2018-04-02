import * as wml from '@quenk/wml';
import * as views from './wml/nav';
import { Link, LinkClickedEvent } from '../../../../lib/content/nav/link';
import { Page } from '../Page';

export class NavPage extends Page {

    view: wml.View = new views.Main(this);

    active = '';

    links =  {

        Home: {},
        Profile: {},
        Messages: {}

    }

    navigate = (e: LinkClickedEvent) => {

        this
            .view
            .findGroupByName('links')
            .map((ls: Link[]) => ls.map(l => l.deactivate()))
            .chain(() => this.view.findById(e.name))
            .map((l: Link) => l.activate());

    }

}
