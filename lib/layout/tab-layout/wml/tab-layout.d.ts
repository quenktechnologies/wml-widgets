import * as ___wml from '@quenk/wml';
import { TabLayout } from '..';
export declare const empty: (___context: TabLayout) => (___view: ___wml.View) => ___wml.Content;
export declare const content: (c: ___wml.Content) => (_: TabLayout) => (___view: ___wml.View) => ___wml.Content;
export declare class Main extends ___wml.AppView<TabLayout> {
    constructor(___context: TabLayout);
}
