# Current directory
HERE=$(shell pwd)

PUBLIC_DIR?=public
PUBLIC_CSS_DIR=$(PUBLIC_DIR)/css

# Destination for the css file.
CSS_DEST?=$(PUBLIC_CSS_DIR)/wml-widgets.css

# WML compiler
WMLC?=node_modules/.bin/wml 
 
# Typescript compiler
TSC?=./node_modules/.bin/tsc

# Browserify bundler
BROWSERIFY?=./node_modules/.bin/browserify

# Less compiler
LESSC?=./node_modules/.bin/lessc

# Common src directory
COMMON_SRC_DIR=src/components/wml-widgets-common

# Common lib directory
COMMON_DEST_DIR=lib/components/wml-widgets-common

# Path to folder with all the sources, we copy this to a temporary folder.
SRC_DIR?=src

# Paths to the objects we use for interpolation when building less files.
JS_VARS_OBJECTS="./lib/components/wml-widgets-common/Styles.js"

# Include paths for the less compiler.
LESS_INCLUDE_PATHS=less
LESS_INCLUDE_PATHS+=:src 

# Entry point for the less compiler.
LESS_ENTRY_POINT=less/theme/default/theme.less

TEST_APP_DIR=test/app 
TEST_APP_ENTRY_JS=$(TEST_APP_DIR)/app.js
TEST_APP_ENTRY_LESS=$(TEST_APP_DIR)/style.less 
TEST_APP_DEST_DIR=test/app/public
TEST_APP_DEST_JS=$(TEST_APP_DEST_DIR)/test.js
TEST_APP_DEST_CSS=$(TEST_APP_DEST_DIR)/style.css

.PHONY: clean
clean:
	rm -R lib/*; rm -R $(PUBLIC_DIR)/*; \
	mkdir lib; mkdir -p $(PUBLIC_CSS_DIR)
   
.PHONY: common
common:
	$(TSC) --project $(COMMON_SRC_DIR) && \
	cp $(COMMON_SRC_DIR)/package.json $(COMMON_DEST_DIR)	


.PHONY: less
less: 
	$(LESSC) --js-vars="$(JS_VARS_OBJECTS)" \
	--include-path=$(LESS_INCLUDE_PATHS) $(LESS_ENTRY_POINT) \
	> $(CSS_DEST)


.PHONY: install-common
install-common:
	  npm install $(COMMON_DEST_DIR)

.PHONY: wml
wml:
	$(WMLC) --extension ts --typescript $(SRC_DIR)

.PHONY: ts
ts:
	$(TSC) --sourceMap --project $(SRC_DIR) && \
	cp $(COMMON_SRC_DIR)/package.json \
	$(COMMON_DEST_DIR)/package.json

.PHONY: install-lib
install-lib:
	npm link

.PHONY: test-wml
test-wml:
	$(WMLC) --typescript --extension ts --pretty $(TEST_APP_DIR)

.PHONY: test-ts
test-ts:
	$(TSC) --sourceMap --project $(TEST_APP_DIR)

.PHONY: test-app
test-app:
	$(BROWSERIFY) --debug $(TEST_APP_ENTRY_JS) > $(TEST_APP_DEST_JS)

.PHONY: test-less
test-less:
	$(LESSC) --source-map-less-inline \
	  --js-vars=$(JS_VARS_OBJECTS) \
	  --include-path=$(LESS_INCLUDE_PATHS) $(TEST_APP_ENTRY_LESS) \
	  > $(TEST_APP_DEST_CSS)

.PHONY: build
build:  clean common install-common wml ts

.PHONY: test
test: 	clean common install-common wml ts install-lib test-wml test-ts test-app test-less
