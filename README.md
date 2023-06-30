# Posts

React test project that shows posts, albums and todos.

## Main stack

React | Typescript | Radix UI | Stitches,js

## Project structure

src - Project's main code.

components - List of components that are used accross the project.

cards - All the card components for displaying single post, album or todo.

hooks - Helper hooks for extracting common logic away from the components.

pages - Two available pages, `Home` and `Album`.

routes - Config for converting pages to routes.

theme - Theme config and useful method exports.

types - General types used in the project.

utils - Common logics extracted into the method.

## Packages

Radix UI - Collection of unstyled components like alert dialog, checkbox, dialog, icons, navigation menu, label, select and tooltip

Stitches.js - Styling engine that is used in Radix UI as well, used for theming and creating custom styled components

React-Router-Dom - Routing between pages

SWR - Data fetching and caching

React-Loader-spinner - Used for displaying loading spinner while processing asynchronous operations.

Craco - Used for proper integration with import path aliases with React and typescript.
