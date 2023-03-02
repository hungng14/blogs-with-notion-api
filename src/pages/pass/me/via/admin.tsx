import Link from "next/link";
import React, { useCallback } from "react";
import bgImage from "@/images/things-to-do-bologna-34.jpeg";
import { useForm } from "react-hook-form";
import { toast } from "@/components/base/toast/toast";
import httpClient from "@/libs/httpClient";
import AlertMessage from "@/components/base/AlertMessage";
import isEmail from "validator/lib/isEmail";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSave = useCallback(
    async (data) => {
      try {
        await httpClient
          .post("/api/admin/login", data)
          .then((res) => console.log(res.data));
        toast({ type: "success", message: "Login successfully" });
        router.push("/admin");
      } catch (error) {
        console.log("error", error);
        toast({ type: "error", message: "Email or Password invalid" }, 5000);
      }
    },
    [router]
  );
  return (
    <section
      className="bg-gray-50 dark:bg-gray-900 h-[100vh]"
      style={{ background: `url(${bgImage.src}) no-repeat` }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-full">
        <Link href={"/"} className="text-white text-3xl mb-4">
          <span className="text-5xl font-bold">HONES</span>{" "}
          <span className="font-medium">Blogs</span>
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit(onSave)}>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    {...register("email", {
                      required: "Email is required",
                      validate: (value) => {
                        if (Array.isArray(value) && !value.length) return;
                        if (value && !isEmail(value)) return "Email invalid";
                      },
                    })}
                  />
                  <AlertMessage message={errors?.email?.message} />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <AlertMessage message={errors?.password?.message} />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
