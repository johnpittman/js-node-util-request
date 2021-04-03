*** WARNING: IN DEVELOPMENT ***

Enhanced native fetch implementation for real world use cases.

# Features

- Middleware
  - ex. override headers
- Response handlers
  - Run in order as added
  - Reduce complexity of response handling
  - Ex. parse JSON based on response type then turn it into an error
- Pass custom options through the pipeline
  - allow passed options to middleware/handlers
- Handler: jsonParser
  - parse fetch responses based on content-type
- Middleware: jsonSender
  - set fetch json headers

# TODO

- Merge user opts with global opts to avoid having to check both in middleware/handlers as well as forced to use 'function' syntax
  since global opts are not piped through

## Addons

### Handlers

## TODO

- Custom error responses
  - Format thrown errors

# Project

Typescript node library.

## Stack

### Typescript

### Eslint

- Linting/formatting to utilize caching and avoid an extra code style process.
- Uses prettier rules to apply prettier formatting.

### Prettier

- Used as a eslint plugin to support formatting

### Jest

- Configured to run typescript with transform paths.
