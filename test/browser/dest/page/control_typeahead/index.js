"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeaheadPage = void 0;
const views = require("./wml/typeahead");
const results = [
    { label: 'Asus', value: 'Asus' },
    { label: 'MSI', value: 'MSI' },
    { label: 'Gigabyte', value: 'Gigabyte' },
    { label: 'Gigas', value: 'Gigas' },
    { label: 'AsusTek', value: 'AsusTek' },
    { label: 'Asusuga', value: 'Asusuga' },
    { label: 'Qualcomm', value: 'Qualcomm' },
    { label: 'Qualitative', value: 'Qualitatve' },
    { label: 'Kirpalani\'s', value: 'Kirpalani\'s' },
    { label: 'Asunder', value: 'Asunder' }
];
class TypeaheadPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            normal: {
                id: 'normal',
                name: 'normal',
                label: 'Normal',
                value: 'Normal',
                stringifier: (r) => r.value,
                onSearch: doSearch(this),
                onChange: doChange(this)
            },
            block: {
                id: 'block',
                name: 'block',
                label: 'Block',
                stringifier: (r) => r.value,
                onSearch: doSearch(this),
                onChange: doChange(this)
            },
            success: {
                id: 'success',
                name: 'success',
                label: 'Success',
                stringifier: (r) => r.value,
                message: 'This has a success message.',
                onSearch: doSearch(this),
                onChange: doChange(this)
            },
            warning: {
                id: 'warning',
                name: 'warning',
                label: 'Warning',
                stringifier: (r) => r.value,
                message: 'This has a warning message.',
                onSearch: doSearch(this),
                onChange: doChange(this)
            },
            error: {
                id: 'error',
                name: 'error',
                label: 'Error',
                stringifier: (r) => r.value,
                message: 'This has a error message.',
                onSearch: doSearch(this),
                onChange: doChange(this)
            },
        };
    }
}
exports.TypeaheadPage = TypeaheadPage;
const doSearch = (page) => ({ name, value }) => page
    .view
    .findById(name)
    .map((s) => {
    let hit = results.filter(c => c.value.toLowerCase().startsWith(value) ? true : false);
    s.update(hit);
});
const doChange = (page) => ({ name, value }) => page
    .view
    .findById(name)
    .map(t => {
    t.setMessage(`Selected: ${value}`);
});
exports.default = new TypeaheadPage();
//# sourceMappingURL=index.js.map