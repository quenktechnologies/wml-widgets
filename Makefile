# Current directory
HERE=$(shell pwd)

# WML compiler
WMLC?=node_modules/.bin/wml 
 
# Typescript compiler
TSC?=./node_modules/.bin/tsc

# Browserify bundler
BROWSERIFY?=./node_modules/.bin/browserify

# Less compiler
LESSC?=./node_modules/.bin/lessc

# ln may be different on windows?
LN?=ln -s

# rm may be different on windows?
RMDIR?=rm -R

# mkdir may be different on windows?
MKDIR?=mkdir -p

# cp may be different on windows?
CP?=cp -R

# Public dirs
PUBLIC_DIR?=public
PUBLIC_CSS_DIR=$(PUBLIC_DIR)/css

# Path to folder with all the sources, we copy this to a temporary folder.
SRC_DIR?=src

# Path to copy and build files in
DEST_DIR=lib

# Paths to the objects we use for interpolation when building less files.
JS_VARS_OBJECTS="@package/self/common/names.js"

# Entry point for the less compiler.
LESS_ENTRY_POINT=src/less/build.less

# Destination for the css file.
CSS_DEST?=$(PUBLIC_CSS_DIR)/widgets.css

TEST_APP_DIR=example/app
TEST_BUILD_DIR=example/build
TEST_JS_ENTRY=$(TEST_BUILD_DIR)/app.js
TEST_LESS_ENTRY=$(TEST_BUILD_DIR)/less/app.less 
TEST_DEST_DIR=example/public
TEST_JS_DEST=$(TEST_DEST_DIR)/app.js
TEST_CSS_DEST=$(TEST_DEST_DIR)/app.css

.PHONY: clean
clean:
	$(RMDIR) $(DEST_DIR); $(RMDIR) $(PUBLIC_DIR); \
	$(MKDIR) $(PUBLIC_CSS_DIR)

.PHONY: copy
copy:
	$(CP) $(SRC_DIR) $(DEST_DIR)

.PHONY: install-self
install-self:
	npm install $(DEST_DIR)
   
.PHONY: wml
wml:
	$(WMLC) --extension ts --typescript $(DEST_DIR)

.PHONY: ts
ts:
	$(TSC) --sourceMap --project $(DEST_DIR)

.PHONY: less
less: 
	$(LESSC) --source-map-less-inline \
	  --js-vars="$(JS_VARS_OBJECTS)" \
	  --npm-import $(LESS_ENTRY_POINT) \
	> $(CSS_DEST)

.PHONY: test-clean
test-clean:
	$(RMDIR) $(TEST_BUILD_DIR); $(MKDIR) $(TEST_BUILD_DIR)

.PHONY: test-copy
test-copy:
	$(CP) $(TEST_APP_DIR)/* $(TEST_BUILD_DIR)

.PHONY: test-wml
test-wml:
	$(WMLC) --typescript --extension ts --pretty $(TEST_BUILD_DIR)

.PHONY: test-ts
test-ts:
	$(TSC) --sourceMap --project $(TEST_BUILD_DIR)

.PHONY: test-app
test-app:
	$(BROWSERIFY) --debug $(TEST_JS_ENTRY) > $(TEST_JS_DEST)

.PHONY: test-less
test-less:
	$(LESSC) --source-map-less-inline \
	--js-vars=$(JS_VARS_OBJECTS) \
	--npm-import \
	$(TEST_LESS_ENTRY) >\
	$(TEST_CSS_DEST)

.PHONY: build
build: clean copy install-self wml ts less

.PHONY: test
test: clean copy install-self wml ts \
      test-clean test-copy test-wml test-ts test-app test-less
