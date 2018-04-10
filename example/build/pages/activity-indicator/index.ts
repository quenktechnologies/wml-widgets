import * as wml from '@quenk/wml';
import * as views from './wml/activity-indicator';
import { Page } from '../Page';

export class ActivityIndicatorPage extends Page {

    view: wml.View = new views.Main(this);

}
