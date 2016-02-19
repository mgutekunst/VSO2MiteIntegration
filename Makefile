include variables.mk #user specific variables are stored here....


all: publish


build:
	tfx extension create --manifest-globs mite2vso-extension.json

publish:
	tfx extension publish --manifest-globs mite2vso-extension.json --share-with $(shareTarget) --token $(token)
