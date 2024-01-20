import { api, isTRPCClientError } from "@/api-client/browser";
import { AppRouter, getServerAuthSession } from "@/server";
import { inferProcedureInput } from "@trpc/server";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";

type UserRegisterInput = inferProcedureInput<
  AppRouter["backoffice"]["user"]["register"]
>;

const Roles: Record<UserRegisterInput["role"], UserRegisterInput["role"]> = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export default function AdminDashboard() {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const { data, error: listUsersError } =
    api.backoffice.user.listUsers.useQuery();
  const { mutateAsync } = api.backoffice.user.register.useMutation();
  const { register, handleSubmit, formState, setError } = useForm<{
    email: string;
    password: string;
    name: string;
    role: UserRegisterInput["role"];
  }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async ({ email, password, name, role }) => {
    try {
      const response = await mutateAsync({ email, password, name, role });
      if (response.success) {
        setServerError("");
      }
    } catch (error) {
      if (isTRPCClientError<UserRegisterInput>(error)) {
        const fieldErrors = error.data?.zodError?.fieldErrors;
        if (!fieldErrors) {
          if (error.message) {
            setServerError(error.message);
          } else {
            setServerError("Failed to register user. Please try again.");
          }
        }
        for (const fieldName in fieldErrors) {
          const messages = fieldErrors[fieldName];
          if (messages) {
            setError(fieldName as keyof Omit<UserRegisterInput, "image">, {
              message: messages.join(", "),
            });
          }
        }
      } else {
        setServerError("Failed to register user. Please try again.");
      }
    }
  });

  return (
    <section className="text-center m-auto mt-16 w-full max-w-lg">
      <h1 className="text-4xl">Admin Dashboard</h1>
      <p className="mt-4 text-xl">This is the admin dashboard</p>
      <div className="mt-4">
        <h2 className="text-2xl">Register new user</h2>
        {success && (
          <p className="text-green-500 text-xs italic">
            User registered successfully
          </p>
        )}
        {serverError && (
          <p className="text-red-500 text-xs italic">{serverError}</p>
        )}
        <form title="Register new user" onSubmit={onSubmit}>
          <label
            htmlFor="email"
            className="block uppercase tracking-wide text-xs font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600"
            {...register("email", { required: true })}
          />
          {formState?.errors?.email && (
            <p className="text-red-500 text-xs italic">
              {formState?.errors?.email?.message}
            </p>
          )}
          <label
            htmlFor="password"
            className="block uppercase tracking-wide text-xs font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600"
            {...register("password", { required: true })}
          />
          {formState?.errors?.password && (
            <p className="text-red-500 text-xs italic">
              {formState?.errors?.password?.message}
            </p>
          )}
          <label
            htmlFor="name"
            className="block uppercase tracking-wide text-xs font-bold mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600"
            {...register("name", { required: true })}
          />
          {formState?.errors?.name && (
            <p className="text-red-500 text-xs italic">
              {formState?.errors?.name?.message}
            </p>
          )}
          <label
            htmlFor="role"
            className="block uppercase tracking-wide text-xs font-bold mb-2"
          >
            Role
          </label>
          <select
            id="role"
            className="appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600"
            {...register("role", { required: true })}
          >
            {Object.values(Roles).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {formState?.errors?.role && (
            <p className="text-red-500 text-xs italic">
              {formState?.errors?.role?.message}
            </p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Register
          </button>
        </form>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl">Users list</h2>
        {listUsersError && (
          <p className="text-red-500">
            {listUsersError?.message || "An error occurred"}
          </p>
        )}
        <ul className="mt-4">
          {data?.map((user) => (
            <li key={user.id} className="text-left">
              <p>
                {user.email} - ({user.role})
              </p>
            </li>
          ))}
        </ul>
      </div>
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
