# Current directory
HERE=$(shell pwd)

WMLC?=./node_modules/.bin/wmlc
TSC?=./node_modules/.bin/tsc
BROWSERIFY?=./node_modules/.bin/browserify
TYPEDOC?=./node_modules/.bin/typedoc
LESSC?=./node_modules/.bin/lessc
FIND?=find

# Entry point for the less compiler.
LESS_INCLUDE_PATHS=node_modules

./ : lib dist test
	touch $@

lib:  $(shell $(FIND) src -name \*.ts -o -name \*.wml) src/classNames.ts
	rm -R $@ || true
	cp -R src $@
	$(WMLC) --extension ts $@ 
	$(TSC) --sourceMap --project $@ 
	touch $@ 

src/classNames.ts: $(shell $(FIND) \
                   src -name \*.less -o -name \*.ts -not -name classNames.ts)
	mkdir -p lib
	grep -rsl "///classNames:begin" src | \
	xargs sed -n "/\/\/\/classNames:begin/,/\/\/\/classNames:end/p" \
	> $@ 

dist: dist/widgets.css
	touch $@

# build a css file you an include on a page to have the css for all widgets.
dist/widgets.css: widgets.less lib
	mkdir -p dist
	$(LESSC) --source-map-less-inline \
	 --js-vars="./lib/classNames" \
	--include-path=$(LESS_INCLUDE_PATHS) \
	--npm-import widgets.less > $@
	
widgets.less: $(shell $(FIND) src -name \*.less)
	echo "" > $@
	$(foreach f,$^,\
	echo '@import "./$(subst src,lib,$(f))";' >> $@ && ) true

test: test/browser
	touch $@

test/browser: test/browser/public
	touch $@

test/browser/public: test/browser/public/app.js\
                     test/browser/public/app.css\
		     test/browser/public/test.js
	touch $@

test/browser/public/app.js: test/browser/dest
	mkdir -p test/browser/public
	$(BROWSERIFY) --debug test/browser/dest/app.js > $@ 

test/browser/dest: lib test/browser/app
	rm -R $@ || true
	cp -r test/browser/app $@
	$(WMLC) --extension ts $@ 
	find test/browser/app/page -type d | \
	echo "export const pages:{[key:string]:any} = {" >\
	test/browser/dest/pages.ts	
	ls test/browser/app/page |\
	sed "s/[^ ]*/'&' : require('.\/page\/&').default,/g" >>\
	test/browser/dest/pages.ts
	echo "}" >> test/browser/dest/pages.ts
	$(TSC) --sourceMap --project $@

test/browser/app: $(shell find test/browser/app -name \*.ts -o -name \*.wml)
	touch $@

test/browser/public/app.css: lib/classNames.js\
			     $(shell find src -name \*.less)\
                             $(shell find test/browser/app -name \*.less)
	mkdir -p test/browser/public
	$(LESSC) --source-map-less-inline \
	--js-vars="./lib/classNames" \
	--include-path=$(LESS_INCLUDE_PATHS) \
	--npm-import \
	--source-map-map-inline \
	test/browser/app/less/app.less > $@

test/browser/public/test.js: test/browser/dest/run.js
	$(BROWSERIFY) test/browser/dest/run.js > $@

test/browser/dest/run.js: $(shell find test/browser/unit -name \*_test.ts)
	mkdir -p test/browser/dest
	cd test/browser/unit/ && \
	find . -name \*_test.js | \
	sed 's/[^ ]*/require("&");/g' >> ../dest/run.js

.PHONY: docs
docs: src
	$(TYPEDOC) --out docs \
	  --excludeExternals \
	  --excludeNotExported \
	  --tsconfig src/tsconfig.json
	 touch docs/.nojekyll

.DELETE_ON_ERROR:
