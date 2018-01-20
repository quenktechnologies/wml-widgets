import * as ___wml from '@quenk/wml';
import { Panel as PanelContext } from '../Panel';
import { Header as HeaderContext } from '../Header';
import { Body as BodyContext } from '../Body';
import { Footer as FooterContext } from '../Footer';
export declare class Panel extends ___wml.AppView<PanelContext> {
    constructor(___context: PanelContext);
}
export declare class Header extends ___wml.AppView<HeaderContext> {
    constructor(___context: HeaderContext);
}
export declare class Body extends ___wml.AppView<BodyContext> {
    constructor(___context: BodyContext);
}
export declare class Footer extends ___wml.AppView<FooterContext> {
    constructor(___context: FooterContext);
}
