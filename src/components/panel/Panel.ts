import { AbstractWidget } from '@quenk/wml/lib/runtime';
import * as views from './wml/panel';

export class Panel extends AbstractWidget {

    view = new views.Panel(this);

}

export class Header extends AbstractWidget {

    view = new views.Header(this);

}

export class Body extends AbstractWidget {

    view = new views.Body(this);

}

export class Footer extends AbstractWidget {

    view = new views.Footer(this);

}
