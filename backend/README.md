# Todo App Node.js Backend

Database Used -> MySQL

### Libraries Used

- Express -> for micro-framework
- Zod -> for request validation
- Winston -> for logging
- MikroOrm -> for ORM

### Running the backend

- First, create `.env.dev` file with env variables as given in `env.example` file.
- Run db migrations with `yarn migration:up`
- Then, `yarn dev` to start dev server on port `8000`
