import { getServerAuthSession } from "@/server";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { register, handleSubmit, formState, setError } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile/update";

  const errors = formState.errors;

  const onSubmit: SubmitHandler<{
    email: string;
    password: string;
  }> = async (data, e) => {
    e?.preventDefault();

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        csrfToken,
      });
      debugger;
      if (res?.error) {
        setError("root", {
          type: "manual",
          message: "Invalid email or password",
        });
      }
      if (res?.url) {
        router.push(callbackUrl);
      }
    } catch (error) {
      debugger;
      setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center"
    >
      {errors.root && (
        <div className="text-red-500 mb-4">{errors.root.message}</div>
      )}
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label className="mb-4 flex flex-col" htmlFor="email">
        Email address
        <input
          type="email"
          id="email"
          className="border border-gray-300 rounded-md p-2 text-black w-64"
          {...register("email", { required: true })}
        />
      </label>
      <label className="mb-4 flex flex-col" htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          className="border border-gray-300 rounded-md p-2 text-black w-64"
          {...register("password", { required: true })}
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Sign in
      </button>
    </form>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  const session = await getServerAuthSession(context);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }
  return {
    props: { csrfToken },
  };
}
