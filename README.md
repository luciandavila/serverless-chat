<p>
  <a href="https://github.com/luciandavila/serverless-chat/actions?query=workflow%3Aci"><img alt="Serverless Chat ci status" src="https://github.com/luciandavila/serverless-chat/workflows/ci/badge.svg"></a>
</p>

# serverless-chat

Simple serverless chat app created with Nuxt.js, connected to google cloud tools like Firebase Authentication and Firebase Realtime Database.

The app can be accessed through the static hosting service Firebase Hosting, at <a href="https://serverless-chat-a3350.web.app/">https://serverless-chat-a3350.web.app/</a>, and offers a PWA option.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Linting and testing

```bash

# running js linter
$ yarn lint:js

# running styles linter 
$ yarn lint:style

# running all linters
$ yarn lint

# running tests
$ yarn test
```

## Deployment

  ```bash
  $ curl -sL https://firebase.tools | bash
  $ firebase login
  $ firebase deploy
  ```