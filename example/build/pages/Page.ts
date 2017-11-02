import * as wml from '@quenk/wml';
import { App } from '../app';
import {View} from '@quenk/wml';

export class Page {

  view: View;

    constructor(public app: App) { }

get(id:string, fn: (w:wml.WMLElement)=>void) {

      this
      .view
      .findById(id)
      .map(fn)
      .orJust(()=>console.warn(`${id}: is missing`));

    }


}
