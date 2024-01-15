import { TRPCError, inferProcedureInput } from "@trpc/server";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { api, isTRPCClientError } from "@/api-client/browser";
import { getServerSideAPI } from "@/api-client/server";
import type { AppRouter } from "@/server";

type UpdatePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

type UpdateProfileInput = inferProcedureInput<
  AppRouter["shop"]["user"]["updateProfile"]
>;

export default function UpdatePage(props: UpdatePageProps) {
  const {
    data: { user },
  } = api.shop.user.getProfile.useQuery(props.user.email, {
    initialData: {
      user: props.user,
    },
  });
  const { mutateAsync } = api.shop.user.updateProfile.useMutation();

  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UpdateProfileInput>({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });
  const onSubmit: SubmitHandler<UpdateProfileInput> = async (data) => {
    setServerError("");
    try {
      const res = await mutateAsync(data);
      if (res?.success) {
        setSuccess(true);
      }
    } catch (error) {
      if (error instanceof TRPCError) {
        if (error.code === "UNAUTHORIZED") {
          setServerError("You are not authorized to perform this action.");
        }
      }
      if (isTRPCClientError<UpdateProfileInput>(error)) {
        const fieldErrors = error.data?.zodError?.fieldErrors;
        if (!fieldErrors) {
          setServerError("Failed to update user profile. Please try again.");
        }
        for (const fieldName in fieldErrors) {
          const messages = fieldErrors[fieldName];
          if (messages) {
            setError(fieldName as keyof UpdateProfileInput, {
              message: messages.join(", "),
            });
          }
        }
      } else {
        setServerError("Failed to update user profile. Please try again.");
      }
    }
  };

  return (
    <div className="mt-28 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Update Your Profile</h1>

      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            {success && (
              <p className="text-green-500 text-xs italic">
                Profile updated successfully.
              </p>
            )}
          </div>
          <div className="w-full px-3">
            {serverError && (
              <p className="text-red-500 text-xs italic">{serverError}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
              placeholder="Write your full name here"
              {...register("name", { required: "Name is required" })}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600"
              placeholder="email@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 text-right">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const session = await getSession(context);

    if (!session?.user?.email) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const serverSideAPI = getServerSideAPI(session);
    const data = await serverSideAPI.shop.user.getProfile.fetch(
      session.user.email
    );

    if (!data?.user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: { user: data.user },
    };
  } catch (e) {
    console.error(e);
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
};
