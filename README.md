This is an example of how to approach to a DDD like architecture in a NextJS project. This is very much opinionated and it's not meant to be a guide, but rather a way to explore how to simplify the overhead of a DDD architecture.

Key points:

- Event Based Architecture using an in-memory synchronous event bus
- Prevent imports from DDD folder that are not the entry point src/DDD/index.ts. This is done by eslint `import/no-internal-modules`` rule

DB schema:
image here [DB_schema.svg](./docs/DB_schema.svg)

<img src="./docs/DB_schema.svg"/>
