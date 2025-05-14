import * as wml from '@quenk/wml';
import * as views from './wml/toolbar';

export class ToolbarPage {
    view: wml.View = new views.Main(this);
}

export default new ToolbarPage();
