*** WARNING: IN DEVELOPMENT ***

Enhanced native fetch implementation for real world use cases.

# Features

- Middleware
  - ex. override headers
- Response handlers
  - Run in order as added
  - Configure handlers to reduce redundant response work
  - Ex. parse JSON based on response type
  - Ex. turn a response into an error
- Pass custom options through the pipeline

## Addons

### Handlers

## TODO

- Abort middleware/integrated
  - Creates an AbortController and adds 'abort' method to the fetch promise
- Custom error responses
  - Format thrown errors
- Handler: parse JSON based on content type
  - since options are passed through middleware, can add a key for middleware to check to run on not

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
