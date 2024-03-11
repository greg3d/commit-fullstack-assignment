# Assignment task for COMM-IT
### by Gregory Rosenbaum <gregory.rozenbaum@gmail.com>
#### Structure: ####
This project contains two application:
- server app (inside of './server' folder)
- client app (inside of './client' folder)

`npm run setup` - installs all deps \
`npm run start_server` - runs backend (server) on port 3000 \
`npm run start_client` - runs client (Vite) on http://localhost:5173/

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
        phone: string //JWT
        password: string //bcrypt hash
    }

`/user/profile`

`MAIN_URL = http://localhost:8080/`

**CREATE POST**:

    url: MAIN_URL + 'post/'
    method: post
    body: {
        title: <string>,
        username: <string>
    }`
    response: {
        id: <number>,
        title: <string>,
        username: <string>
        likes: <Array<string>> //usernames
        dislikes: <Array<string>> //usernames
        imageSrc: <string> //path
        date: <number>,
        comments: <Array<Comment>>
    }

**UPDATE POST**

    url: MAIN_URL + 'post/{id}'
    method: put
    body: {
        title?: <string>,
        likes?: Array<<string>>,
        dislikes?: Array<<strings>>
    }
    response: {
        id: <number>,
        title: <string>,
        username: <string>
        likes: <Array<string>>
        dislikes: <Array<string>>
        date: <number>,
        comments: <Array<Comment>>
    }

**FILTER/SEARCH POSTS BY KEYWORD**

    url MAIN_URL + 'post/search/${keyWord}'
    method: get
    response: [
        {
            id: <number>,
            title: <string>,
            username: <string>
            likes: <Array<string>> //usernames
            dislikes: <Array<string>> //usernames
            imageSrc: <string> //path
            date: <number>,
            comments: <Array<Comment>>
        }
        ...
    ]

**GET POSTS BY PAGES (9 posts per page)**

    url MAIN_URL + 'post/page/${pageNumber}' // pageNumber > 0
    response: [
        {
            id: <number>,
            title: <string>,
            username: <string>
            likes: <Array<string>> //usernames
            dislikes: <Array<string>> //usernames
            imageSrc: <string> //path
            date: <number>,
            comments: <Array<Comment>>
        }
        ...
    ]

+ *response conains additional information: totalPages, total and page*

DELETE POST

    url: MAIN_URL + 'post/{id}'
    method: delete
    response: {
        id: <number>,
        title: <string>,
        username: <string>
        likes: <Array<string>> //usernames
        dislikes: <Array<string>> //usernames
        imageSrc: <string> //path
        date: <number>,
        comments: <Array<Comment>>
    }

UPLOAD POST PICTURE

    url: MAIN_URL + 'post/{id}/picture'
    method: post
    body: FormData // should contain file like this formData.append("picture", file);
    response: {
        id: <number>,
        title: <string>,
        username: <string>
        likes: <Array<string>> //usernames
        dislikes: <Array<string>> //usernames
        imageSrc: <string> //path
        date: <number>,
        comments: <Array<Comment>>
    }

CREATE COMMENT

    url: MAIN_URL + 'comment'
    method: post
    body: {
        text: <string>,
        postId: <number>,
        username: <string>,
    }
    response: {
        id: <number>,
        text: <string>,
        postId: <number>,
        username: <string>,
        likes: <Array<strings>>,
        dislikes: <Array<strings>>,
        date: <number>
    }

UPDATE COMMENT

    url: MAIN_URL + 'comment/{id}'
    method: put
    body: {
        text: <string>,
        likes: <Array<strings>>,
        dislikes: <Array<strings>>,
    }
    response: {
        id: <number>,
        text: <string>,
        postId: <number>,
        username: <string>,
        likes: <Array<strings>>,
        dislikes: <Array<strings>>,
        date: <number>
    }

DELETE COMMENT

    url: MAIN_URL + 'comment/{id}'
    method: delete
    response: {
        id: <number>,
        text: <string>,
        postId: <number>,
        username: <string>,
        likes: <Array<strings>>,
        dislikes: <Array<strings>>,
        date: <number>
    }


=============== i hope next endpoints will shouldn't be used, but i'll left it here, just in case ====================

GET ALL POSTS

    url: MAIN_URL + 'post'
    method: get
    response: [
        {
            id: <number>,
            title: <string>,
            username: <string>
            likes: <Array<string>> //usernames
            dislikes: <Array<string>> //usernames
            imageSrc: <string> //path
            date: <number>,
            comments: <Array<Comment>>
        }
        ...
    ]


GET POST

    url: MAIN_URL + 'post/{id}'
    method: get
    response: {
        id: <number>,
        title: <string>,
        username: <string>
        likes: <Array<string>> //usernames
        dislikes: <Array<string>> //usernames
        imageSrc: <string> //path
        date: <number>,
        comments: <Array<Comment>>
    }


GET COMMENT

    url: MAIN_URL + 'comment/{id}'
    method: get
    response: {
        id: <number>,
        text: <string>,
        postId: <number>,
        username: <string>,
        likes: <Array<strings>>,
        dislikes: <Array<strings>>,
        date: <number>
    }


GET COMMENTS

    url: MAIN_URL + 'comment'
    method: get
    response: [
        {
            id: <number>,
            text: <string>,
            postId: <number>,
            username: <string>,
            likes: <Array<strings>>,
            dislikes: <Array<strings>>,
            date: <number>
        },
        ...
    ]