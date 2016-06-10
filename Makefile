include variables.mk #user specific variables are stored here....


all: buildAndPublish

clean:
	rm -rfv dist

dist-clean: clean
	rm -rfv typings

typings:
	typings install

bower:
	bower install

build:
	tsc 

package: build
	tfx extension create --manifest-globs mite2vso-extension.json

publish: 
	tfx extension publish --manifest-globs mite2vso-extension.json --share-with $(shareTarget) --token $(token)

buildAndPublish: build publish
