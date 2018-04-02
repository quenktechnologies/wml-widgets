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

# Paths to the objects we use for interpolation when building less files.
JS_VARS_OBJECTS:="./lib/classNames"

# Entry point for the less compiler.
LESS_INCLUDE_PATHS=less:src

$(HERE) : lib dist example
	$(TOUCH) $@
# copy sources to the lib and generates the generated ts code.
lib:  $(shell $(FIND) src -name \*.ts -o -name \*.wml -o -name \*.less)
	$(shell $(MKDIRP) $@)
	$(shell $(CPR) src/* $@)
	$(WMLC) --pretty --extension ts $@ 
	$(shell cat $@/util/class-names/index.ts > $(HERE)/lib/classNames.ts) 
	$(foreach class,$(CLASS_NAMES_FILES),$(shell cat $(class) >> $(HERE)/lib/classNames.ts)) 
	$(TSC) --sourceMap --project $@ 
	$(TOUCH) $@ 

dist: dist/widgets.css
	$(TOUCH) $@

# build a css file you an include on a page to have the css for all widgets.
dist/widgets.css: lib $(shell $(FIND) less -name \*.less) $(shell $(FIND) lib -name \*.less)
	$(MKDIRP) dist
	$(LESSC) --source-map-less-inline \
	 --js-vars="$(JS_VARS_OBJECTS)" \
	--include-path=$(LESS_INCLUDE_PATHS) \
	--npm-import less/build.less > $@

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

example/public/app.css: lib $(shell $(FIND) example/app -name \*.less) $(shell $(FIND) less -name \*.less)
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

.PHONY: remove-js
remove-js:
	$(eval JS=$(shell $(FIND) src -name \*.js))
	$(eval DT=$(shell $(FIND) src -name \*.d.ts))
	$(eval SM=$(shell $(FIND) src -name \*.map))
	$(foreach j,$(DT),$(shell rm $(j)))
	$(foreach j,$(SM),$(shell rm $(j)))
	$(foreach j,$(JS),$(shell rm $(j)))
