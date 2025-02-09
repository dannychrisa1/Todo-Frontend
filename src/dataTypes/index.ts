export type User  = {
    uuid:string
    username:string
    email:string
}

export type SignUpFormData = {
    username:string
    email:string
    password:string
}

export type  LoginFormData = {
    email:string
    password:string
}

export type createTodoFormData = {
    title:string
    description:string
    dueDate:string
}

export type Todo = {
    "title": string,
    "description": string,
    "dueDate": string,
    "user": {
        "createdAt": string
        "updatedAt":  string
        "deletedAt": null,
        "uuid": string
        "username": string,
        "email": string,
        "password": string
    },
    "updatedAt": string,
    "createdAt": string,
    "deletedAt": null,
    "uuid": string
    "status": boolean
}