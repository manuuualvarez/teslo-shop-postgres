<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API
1. Clone Project
2. ```yarn install```
3. Clone the file ```.env.template``` and rename as ```.env```
4. Fill all the environment variables on ```.env```
5. Up database
```
  docker-compose up -d
```
6. Run with next command:
```
  yarn start:dev
```
7. Fill data (be sure that run on debug)
```
  GET -> localhost:3000/api/seed
``` 