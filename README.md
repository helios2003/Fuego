# Fuego
Fuego (Spanish for 🔥) is a blogging website where users can publish their blogs and read other people's blogs. It is built using Hono as the serverless framework, PostgreSQL as database and React typescript as the frontend framework, Recoil for state management and Tailwind CSS for styling components.

## Setting up the Repository
- Create a fork of the repository or clone the repository using the command:
```
git clone https://github.com/helios2003/Fuego.git
```
### Backend
- Change the directory into ``backend`` and run ``npm install``.
- Obtain a PostgreSQL database and enabe connection pooling in it.
- Rename ``.env.example`` to ``.env`` and ``wrangler-example.toml`` to ``wrangler.toml`` and fill the environment variables.
- In ``.env`` add the original database URL and in the ``wrangler.toml`` add the pooled database URL.
- Run the command to generate the database schema.
```
npx prisma migrate dev --name <commit-message>
```
- Run the command to generate the prisma client.
```
npx prisma generate --no-engine
```
- Run ``npm run dev`` to start the backend.
- Or you can run ``npm run deploy`` after logging into Cloudflare using the command ``npx wrangler login``.

### Frontend
- Change the directory into ``frontend`` and run ``npm install``.
- Run ``npm run dev`` to start the frontend.

## References
- https://hono.dev
- https://www.prisma.io/docs
- https://recoiljs.org




