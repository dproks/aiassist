This is example AI prompt app.
Typescript, React, Redux Toolkit, RTK Query on client side
Typescript, NodeJS, MongoDB, Mongoose on server side
Also includes basic example of LangchainJS usage
Containerised in Docker, Runs from Makefile

1. create aiassist-server/.env and put there
   OPENAI_API_KEY="YOUR_API_KEY"
2. get docker with docker-compose
3. `make build` from root directory

to use cli

1. create f/.env and put there
   OPENAI_API_KEY="YOUR_API_KEY"
2. `cd f`
3. `npm link`
4. `gimme %your question here%` (? -> \?)
