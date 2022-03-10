# SSG Generator
This is a proof of concept to generate static sites based on a dynamic content, where you can generate entairy dinamic sites and every interaction even acticles and pages based of a JSON object.

## Must know
This is meant to be a test where a dev could create and modify a site and update it, and from the generated files, just upload to the site, not depending from much code nor a server to process request, so much of the processing of the site will already be done.

The ideia would be to always have the best score, and SEO without needed complex codes.

## Help needed
This ideia is too big to tackle alone to do a good enough for most cases, so any help, even requests would be appreciated.

## Where we are
Right now i'm tryng to do simple site with 3 basic routes, one for the index, one for the articles (pagined), one for reading a article.

And adding any behaiviour for that happen.

## Commands
- yarn json
  - to start the server which provides the JSON
  - change values to the file JSONsExample/example.JS to see it in the frontend
- yarn dev
  - to start developing and test the Frontend part
  - Do not forget to start the JSON server
- yarn build
  - creates the static files
- yarn preview
  - starts the server for the static files generated

## Tech stacks
### Vue
We are using Vue 3 to render pages
### VITE
Vite is the bundler and dev server to stick everything together
### Vite SSR Plugin
SSR plugin is needed to render the pages as a server to after use it as static files
### Vite SSG Plugin
SSG plugins uses the SSR plugin to create the static files

## TODOs
-  dynamic routes
  -  static part not genererated correctly
- TailwindCSS
  - doesn't load parts of it based on the JSON usage.
- Missing features
  - nested SEO
  - JSON Schema
  - JSON example
  - More CSS libraries
  - Create commands to generate and tar the static files for a requester.