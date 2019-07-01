import * as wml from '@quenk/wml';
import * as views from './wml/file-upload-surface'

export class FileUploadSurfacePage {

    view: wml.View = new views.Main(this);

    values = {

    }

}

export default new FileUploadSurfacePage();
