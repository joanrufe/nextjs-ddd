import { getUserProfile } from "@/DDD";
import { UserProfileData } from "@/shared-backend-frontend/api/GetUserProfile";
import { UserProfileUpdateResponse } from "@/shared-backend-frontend/api/UserProfileUpdate";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface UpdatePageProps {
  user: NonNullable<UserProfileData>;
}

type UserUpdateFormInputs = NonNullable<UserProfileData>;

export default function UpdatePage({ user }: UpdatePageProps) {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserUpdateFormInputs>({
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
    },
  });
  const onSubmit: SubmitHandler<UserUpdateFormInputs> = async (data) => {
    setServerError("");
    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: data }),
      });

      if (response.status === 400) {
        const result: UserProfileUpdateResponse = await response.json();
        if ("error" in result && result.error) {
          if ("validationErrors" in result && result.validationErrors) {
            for (const validationError of result.validationErrors) {
              setError(validationError.field as keyof UserUpdateFormInputs, {
                message: validationError.message,
              });
            }
          } else {
            setServerError(result.error);
          }
        }
      } else if (response.status === 500) {
        setServerError("Failed to update user profile. Please try again.");
      } else if (response.status === 200) {
        // TODO: show success message
      }

      // Handle successful update (e.g., show a success message or redirect)
    } catch (error) {
      console.error("Error:", error);
      setServerError("Failed to update user profile. Please try again.");
    }
  };

  return (
    <div className="mt-28 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Update Your Profile</h1>

      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
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
export const getServerSideProps = (async (context) => {
  const session = await getSession(context);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const user = await getUserProfile.byEmail({ email: session.user.email });

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}) satisfies GetServerSideProps<UpdatePageProps>;
