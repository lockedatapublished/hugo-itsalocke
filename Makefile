HUGO := hugo
NPM := npm
STATIC_DIR := static/
ASSETS_JS_DIR := assets/js/vendor/

install-npm:
	$(NPM) install
update-npm:
	$(NPM) update
build-bootstrap:
	mkdir -p $(ASSETS_JS_DIR)
	cp node_modules/jquery/dist/jquery.min.js $(ASSETS_JS_DIR)
	cp node_modules/popper.js/dist/umd/popper.min.js $(ASSETS_JS_DIR)
	cp node_modules/bootstrap/dist/js/bootstrap.min.js $(ASSETS_JS_DIR)
build: build-bootstrap
	HUGO_ENV=production $(HUGO) --source=exampleSite --themesDir=../..
	rm -fr resources/
	mv exampleSite/resources/ .
install: install-npm build-bootstrap
update: update-npm build-bootstrap
serve: clean build-bootstrap
	$(HUGO) server --source=exampleSite --themesDir=../..
	rm -fr resources/
	mv exampleSite/resources/ .

