
.PHONY: run deps

NPM_REGISTRY ?= https://registry.npmjs.org/

deps:
	@if [ ! -x node_modules/.bin/react-scripts ]; then \
		echo "Installing dependencies from $(NPM_REGISTRY)..."; \
		npm install --registry $(NPM_REGISTRY); \
	fi

run: deps
	npm start
