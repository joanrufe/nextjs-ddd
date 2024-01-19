import { getServerAuthSession } from "@/server";
import { GetServerSideProps } from "next";

export default function AdminDashboard() {
  return (
    <section className="text-center mt-28">
      <h1 className="text-4xl">Admin Dashboard</h1>
      <p className="mt-4 text-xl">This is the admin dashboard</p>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);
  const user = session?.user;
  if (!user || user.role !== "ADMIN") {
    return {
      redirect: {
        destination:
          "/error?message=You are not authorized to access this page",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
