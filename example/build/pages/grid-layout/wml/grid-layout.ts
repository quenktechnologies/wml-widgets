import * as ___wml from '@quenk/wml';
import {
    GridLayout,
    Row,
    Column
} from '../../../../../lib/layout/grid-layout';;
import {
    GridLayoutPage
} from '../';



export class Main extends ___wml.AppView < GridLayoutPage > {

    constructor(___context: GridLayoutPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < GridLayoutPage > ) =>
            ___wml.widget(GridLayout, {
                html: {},
                wml: {},
                ww: {
                    'class': ___context.values.root.class
                }
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 1
                }
            }, [___wml.text(`Span 1`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 1
                }
            }, [___wml.text(`Span 1`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 1
                }
            }, [___wml.text(`Span 1`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 1
                }
            }, [___wml.text(`Span 1`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 1
                }
            }, [___wml.text(`Span 1`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 1
                }
            }, [___wml.text(`Span 1`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 1
                }
            }, [___wml.text(`Span 1`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 1
                }
            }, [___wml.text(`Span 1`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 1
                }
            }, [___wml.text(`Span 1`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 1
                }
            }, [___wml.text(`Span 1`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 1
                }
            }, [___wml.text(`Span 1`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 1
                }
            }, [___wml.text(`Span 1`)], ___view)], ___view), ___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 8
                }
            }, [___wml.text(`Span 8`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 4
                }
            }, [___wml.text(`Span 4`)], ___view)], ___view), ___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 4
                }
            }, [___wml.text(`Span 4`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 4
                }
            }, [___wml.text(`Span 4`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 4
                }
            }, [___wml.text(`Span 4`)], ___view)], ___view), ___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 6
                }
            }, [___wml.text(`Span 6`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 6
                }
            }, [___wml.text(`Span 6`)], ___view)], ___view), ___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 6
                }
            }, [___wml.text(`Span 6`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 6
                }
            }, [___wml.text(`Span 6`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 6
                }
            }, [___wml.text(`Span 6`)], ___view), ___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 6
                }
            }, [___wml.text(`Span 6`)], ___view)], ___view), ___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'span': 12
                }
            }, [___wml.text(`Span 12`)], ___view)], ___view)], ___view);

    }

}