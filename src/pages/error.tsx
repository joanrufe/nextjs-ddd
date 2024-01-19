import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const params = useSearchParams();
  return (
    <section className="text-center mt-28">
      <h1 className="text-4xl">Error</h1>
      <p className="mt-4 text-xl">{params.get("message")}</p>
    </section>
  );
}
