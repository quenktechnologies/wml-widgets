import { DrawerLayout } from '@quenk/wml-widgets/lib/components';


export default function (make) { return make.widget(DrawerLayout,{html:{}},[make.node('p',{html:{}},[make.text(`This is in the drawer`)]),make.node('p',{html:{}},[make.text(` This is in main`)])]); }