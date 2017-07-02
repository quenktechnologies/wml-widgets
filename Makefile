
.PHONY: clean
clean:
	rm -R lib/*; rm -R public/*; rm -R node_modules/@quenk/wml-widgets; \
	mkdir -p lib mkdir -p public/css
   
.PHONY: wml
wml:
	./node_modules/.bin/wml --extension ts --typescript src

.PHONY: ts
ts:
	./node_modules/.bin/tsc --project src && \
	  cp src/components/common/package.json \
	  lib/components/common/package.json

.PHONY: less
less: 
	./node_modules/.bin/lessc --js-vars="lib/components/common/Styles.js" \
	  --include-path=less:src/components less/theme/default/theme.less \
	  > public/css/wml-widgets.css

.PHONY: build
build: clean wml ts less

.PHONY: install-lib
install-lib:
	  mkdir -p node_modules/@quenk/wml-widgets/lib; \
	   cp -R lib/* node_modules/@quenk/wml-widgets/lib && \
	   cp package.json node_modules/@quenk/wml-widgets/package.json && \
	  npm install common@file:lib/components/common

.PHONY: test-wml
test-wml:
	./node_modules/.bin/wml --typescript --extension ts --pretty test/app

.PHONY: test-ts
test-ts:
	./node_modules/.bin/tsc test/app/app.ts

.PHONY: test-app
test-app:
	./node_modules/.bin/browserify --debug test/app/app.js > test/app/public/tests.js

.PHONY: test-less
test-less:
	./node_modules/.bin/lessc --js-vars="lib/components/common/Styles.js" \
	  --include-path=less:src test/app/style.less > test/app/public/style.css

.PHONY: test
test: 	clean wml ts install-lib test-wml test-ts test-app test-less


