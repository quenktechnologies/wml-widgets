
.PHONY: clean
clean:
	rm -R lib/*; rm -R public/*; rm -R node_modules/@quenk/wml-widgets; \
	rm -R node_modules/wml-widgets-common; mkdir lib; mkdir -p public/css
   
.PHONY: wml
wml:
	./node_modules/.bin/wml --extension ts --typescript src


.PHONY: common
common:
	./node_modules/.bin/tsc --project src/components/wml-widgets-common &&\
	  cp src/components/wml-widgets-common/package.json lib/components/wml-widgets-common
	
.PHONY: ts
ts:
	./node_modules/.bin/tsc --sourceMap --project src && \
	  cp src/components/wml-widgets-common/package.json \
	  lib/components/wml-widgets-common/package.json

.PHONY: less
less: 
	./node_modules/.bin/lessc --js-vars="./lib/components/wml-widgets-common/Styles.js" \
	  --include-path=less:src/components less/theme/default/theme.less \
	  > public/css/wml-widgets.css

.PHONY: install-lib
install-lib:
	  mkdir -p node_modules/@quenk/wml-widgets/lib; \
	   cp -R lib/* node_modules/@quenk/wml-widgets/lib && \
	   cp package.json node_modules/@quenk/wml-widgets/package.json 

.PHONY: install-common
install-common:
	  ln -s $(shell pwd)/lib/components/wml-widgets-common node_modules/wml-widgets-common

.PHONY: test-wml
test-wml:
	./node_modules/.bin/wml --typescript --extension ts --pretty test/app

.PHONY: test-ts
test-ts:
	./node_modules/.bin/tsc --sourceMap --project test/app

.PHONY: test-app
test-app:
	./node_modules/.bin/browserify --debug test/app/app.js > test/app/public/tests.js

.PHONY: test-less
test-less:
	./node_modules/.bin/lessc --source-map-less-inline \
	  --js-vars="./lib/components/wml-widgets-common/Styles.js" \
	  --include-path=less:src test/app/style.less > test/app/public/style.css

.PHONY: build
build:  clean common install-common wml ts

.PHONY: test
test: 	clean common install-common wml ts install-lib test-wml test-ts test-app test-less


