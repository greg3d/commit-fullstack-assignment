# Assignment task for COMM-IT
### by Gregory Rosenbaum <gregory.rozenbaum@gmail.com>
#### Structure: ####
This project contains two application:
- server app (inside of './server' folder)
- client app (inside of './client' folder)

`npm run setup` - installs all deps \
`npm run start_server` - runs backend (server) on port 3000 \
`npm run start_client` - runs client (Vite) on http://localhost:5173/

Links on original repos:

- client: <https://github.com/greg3d/commit-assignment-client>
- server: <https://github.com/greg3d/commit-assignment-server>

*Node version: 20.10.0* \
Apps runs in **dev** mode

#### CLIENT FEATURES
1. TypeScript
2. Using React/Redux with **RTK Query** on Client-side
3. MUI for UI style
4. Live validation and Submit validation (while filling fields UI shows notices)
5. JWT Token auth (without token can't see USER tab)
6. Custom and simple validation rules (could be easily added more) and Form state
7. RTK Query for fetches
8. Didn't use ZOD and REACT-HOOK-FORM 

#### SERVER FEATURES
1. TypeScript
2. Nest.JS on Server-side
3. SQLite (TypeORM) for database
4. BCrypt hash for passwords in DB
5. JWT Token generation for auth

### TODO (what might be better): 
- save JWT Token locally in browser (session storage/local storage)
- Better component composition :)
- separate repo for Entities, Dto, Classes, that both apps imports.
- finally deal with Zod...

### API endpoints:

*Register*

    url: /auth/register
    method: post
    body: {
        username: string
        phone: string
        password: string
    }
    response: {
        username: number
        token: string //JWT
    }

*Login*

    url: /auth/login
    method: post
    body: {
        username: string
        password: string
    }
    response: {
        username: string
        token: string //JWT
    }

**Get Profile**

    url: /user/profile
    method: get
    response: { 
        profile: {
            id: number
            username: string
            phone: string
        }
    }

**Get User by Username** JUST FOR TEST 
    
    url: /user/{username}
    method: get
    response: {
        id: number
        username: string
        phone: string
        password: string //bcrypt hash
    }

