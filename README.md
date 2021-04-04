** WARNING: UNDER DEVELOPMENT **

Enhanced native fetch implementation for real world use cases.

# Features

- Middleware
  - Ex: Override headers
- Handlers
  - Run in order as added
  - Reduce complexity of response handling
  - Ex: Parse JSON based on response type then turn it into an error
- Custom Options
  - Pass options to middleware and handlers
- Error Handling
  - Define error handler to format error responses

## Addons

- Handler: parseJSON
  - Parse fetch responses into based on content-type

- Middleware: sendJSON
  - Set fetch json headers
- Middleware: query
  - Adds query-string stringification for url query

## TODO

- Utility to know if abort error
  - 'tryCatch' method extraction?
  - Method to look at error info to determine error type?
- Helper methods for creating with middleware/handlers
  - set fetchOpts/headers if don't exist
  - set userOpts if dont' exist

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
