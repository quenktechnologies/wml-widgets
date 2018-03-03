# Current directory
HERE=$(shell pwd)

WMLC?=node_modules/.bin/wmlc
TSC?=./node_modules/.bin/tsc
BROWSERIFY?=./node_modules/.bin/browserify
LESSC?=./node_modules/.bin/lessc
RMR?=rm -R
MKDIRP?=mkdir -p
CPR?=cp -R -u
TOUCH?=touch
FIND?=find

# These have class names specific to each widget.
CLASS_NAMES_FILES:=$(shell $(FIND) src -name classNames.ts)

# Has all the classnames merged into on.
CLASS_NAMES_FILE="@package/wml-widgets/lib/classNames"

# Paths to the objects we use for interpolation when building less files.
JS_VARS_OBJECTS="@package/wml-widgets/common/names,@package/wml-widgets/classNames,@package/wml-widgets/util/class-names"

# Entry point for the less compiler.
LESS_INCLUDE_PATHS=$(HERE)/src/less:src

$(HERE) : lib dist example
	$(TOUCH) $@

lib: $(shell $(FIND) src -name \*.ts -o -name \*.wml)
	$(MKDIRP) $@
	$(CPR) src/* $@
	$(WMLC) --pretty --extension ts $@
	$(TSC) --sourceMap --project $@
	$(shell cat src/util/class-name/index.ts > lib/classNames.ts)
	$(foreach class,$(CLASS_NAMES_FILES),$(shell cat $(class) >> lib/classNames.ts))
	$(TOUCH) $@

dist: dist/widgets.css
	$(TOUCH) $@

dist/widgets.css: $(shell $(FIND) src -name \*.less)
	$(MKDIRP) dist
	$(LESSC) --source-map-less-inline \
	 --js-vars="$(JS_VARS_OBJECTS)" \
	--include-path=$(LESS_INCLUDE_PATHS) \
	--npm-import src/less/build.less > $@

example: example/public
	$(TOUCH) $@

example/public: example/public/app.js example/public/app.css
	$(TOUCH) $@

example/public/app.js: example/build
	$(MKDIRP) example/public
	$(BROWSERIFY) --debug example/build/app.js > $@ 

example/build: $(shell $(FIND) example/app -name \*.ts -o -name \*.wml) lib
	$(MKDIRP) $@
	$(CPR) example/app/* $@
	$(WMLC) --pretty --extension ts $@
	$(TSC) --sourceMap --project $@
	$(TOUCH) $@

example/public/app.css: $(shell $(FIND) example/app -name \*.less) $(shell $(FIND) src -name \*.less)
	$(LESSC) --source-map-less-inline \
	--js-vars=$(JS_VARS_OBJECTS) \
	--include-path=$(LESS_INCLUDE_PATHS) \
	--npm-import \
	example/build/less/app.less > $@

.PHONY: clean
clean: clean-build clean-example

.PHONY: clean-build
clean-build:
	-$(RMR) lib dist || true

.PHONY: clean-example
clean-example:
	$(RMR) example/build || true
