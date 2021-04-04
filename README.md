**_ WARNING: IN DEVELOPMENT _**

Enhanced native fetch implementation for real world use cases.

# Features

- Pluggable
- Middleware
  - Ex: Override headers
- Handlers
  - Run in order as added
  - Reduce complexity of response handling
  - Ex: Parse JSON based on response type then turn it into an error
- Custom Options
  - Allow passed options to middleware/handlers

## Addons

- Handler: parseJSON

  - Parse fetch responses into based on content-type

- Middleware: sendJSON
  - Set fetch json headers
- Middleware: query
  - Adds query-string stringification

## TODO

- Utility to know if abort error
- Custom error response formatting

# Development

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
