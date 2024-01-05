export default function HomePage() {
  return (
    <section className="text-center mt-28">
      <h2 className="text-3xl font-bold mb-4">Welcome to My Project</h2>
      <p className="pb-6">
        This is a Next.js project to show how DDD fits inside a Next.js project.
      </p>
      <p className="pb-6">
        See how in my{" "}
        <a
          className="blue-500 hover:blue-700 text-blue-700 font-bold"
          href="https://github.com/joanrufe/nextjs-ddd"
          target="_blank"
        >
          My github repo
        </a>
      </p>
      <p className="pb-6">Thanks for visiting!</p>
      <p>
        <span role="img" aria-label="hand waving">
          👋
        </span>{" "}
        <span role="img" aria-label="smile">
          😊
        </span>
      </p>
    </section>
  );
}
