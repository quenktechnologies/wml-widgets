import * as wml from '@quenk/wml';
import { ClassMap } from '../../../../lib/util/class-names';
import { Page } from '../Page';
export { ClassMap as __ };
export declare class ButtonPage extends Page {
    view: wml.View;
    values: {
        capitalize: (s: string) => string;
        styles: ClassMap;
        sizes: ClassMap;
    };
}
