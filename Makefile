include variables.mk #user specific variables are stored here....


all: publish

clean:
	rm -rfv dist

dist-clean: clean
	rm -rfv typings

typings:
	typings install

build:
	mkdir -p dist/scripts
	cp -v src/main.html dist/
	cp -v src/scripts/VSS.SDK.js dist/scripts/VSS.SDK.js
	tsc 

package: build
	tfx extension create --manifest-globs mite2vso-extension.json

publish: build
	tfx extension publish --manifest-globs mite2vso-extension.json --share-with $(shareTarget) --token $(token)
