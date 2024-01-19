# DDD in a NextJS backend

This is an example of how to approach a server-like architecture in a NextJS project

In Domain-Driven Design, the code is splitted by the different areas of business instead of by the type of code (controllers, services, etc). This is called Bounded Contexts and it's a way to organize the code in a way that it's easier to understand, maintain and scale.

Key features:

- Event-Based Architecture using an in-memory synchronous event bus to decouple the different domains
- Eslint rule to Prevent imports from server folder that are not the entry point src/server/index.ts. This is done by the eslint `import/no-internal-modules` rule
- Prisma ORM for database access and migrations
- tRPC for type-safe RPC communication between the client and server
- Jest for unit testing
- Playwright for end-to-end testing

## Server Domain-Driven Design (DDD) Folder Structure

The server folder structure in this project is organized as follows:

- `server/`
  - `Backoffice/`
    - `User`
      `Retention/`
    - `Email/`
    - `Notifications/`
  - `Shared/`
    - `EventBus`
    - `PrismaService`
  - `Shop/`
    - `User`

Each subfolder within the `server/` directory represents a different domain of the application.

### Backoffice Bounded Context

The Backoffice bounded context is responsible for managing the backoffice, which is the part of the application that is used by the company's employees to manage the business.

The Backoffice bounded context is further divided into subdomains, which are represented by the subfolders within the `server/Backoffice/` directory. In this example, the only subdomain is the `User` subdomain.

### Shop Bounded Context

The Shop bounded context is responsible for managing the shop, which is the part of the application that is used by the company's customers to buy products.

The Shop bounded context is further divided into subdomains, which are represented by the subfolders within the `server/Shop/` directory. In this example, the only subdomain is the `User` subdomain.

### Retention Bounded Context

The Retention bounded context is responsible for managing the retention of the company's customers. This includes sending emails and notifications to customers to encourage them to buy more products or keep using the company's services.

### Shared Domain

The Shared domain is responsible for managing shared functionality that is used by multiple domains. In this example, the only shared functionality is the EventBus system and the PrismaService.

#### EventBus

The EventBus system is a part of the `Shared/` domain and is a key component in our Domain-Driven Design architecture. It is implemented in the `EventBus.ts` file.

The EventBus system is responsible for managing domain events across the application. It allows different parts of the application to communicate with each other in a decoupled manner. This means that one part of the application can emit an event, and any other part of the application can listen for that event and react accordingly, without the two parts needing to know about each other.

Here's a basic example of how the EventBus system can be used:

```typescript
// Define a domain event
class UserRegistered implements DomainEvent {
  constructor(public readonly user: User) {}
}

// Subscribe to the event in an UseCase
class MyUseCase {
  constructor(private readonly eventBus: EventBus) {
    this.eventBus.subscribe(
      UserRegistered.name,
      this.onUserCreated.bind(this),
      this.constructor.name
    );
  }

  private onUserCreated(event: UserRegistered) {
    // Do something with the event
  }
}

// Publish the event
const user = new User(/* ... */);
this.eventBus.publish(new UserRegistered(user));
```

## DB schema:

Thanks to `prisma-erd-generator` this is autogenerated and placed in [docs/DB_schema.svg](./docs/DB_schema.svg).

Here is a preview:

<img src="./docs/DB_schema.svg" style="max-width: 600px;">
```
