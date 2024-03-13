import { Form, useActionData } from "react-router-dom";

function Login() {
  const errors = useActionData();

  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <a
        href="/"
        className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          className="mr-2 h-8 w-8"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Poll s.
      </a>
      <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          {errors?.credentials && (
            <p className="py-2 text-center text-sm font-medium text-red-500">
              🔴 Incorrect credentials
            </p>
          )}
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <Form method="POST" className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="focus:border-1 block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none transition-all duration-300 focus:border-[#ff5e2e] focus:ring-blue-800 sm:text-sm"
                placeholder="name@company.com"
                required=""
              />
              {errors?.email && (
                <p className="py-1 text-sm font-medium text-red-500">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="focus:border-1 mb-2 block text-sm font-medium text-gray-900 outline-none transition-all duration-300 focus:border-[#ff5e2e] dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="focus:border-1 block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none transition-all duration-300 focus:border-[#ff5e2e] focus:ring-blue-800 sm:text-sm"
                required=""
              />
              {errors?.password && (
                <p className="py-1 text-sm font-medium text-red-500">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="/"
                className="dark:text-primary-500 text-sm font-medium text-[#ff5e2e] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 w-full rounded-lg bg-[#ff5e2e] px-5 py-2.5 text-center text-sm font-medium text-white ring-offset-2 hover:bg-[#ed6749] focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account yet?{" "}
              <a
                href="/"
                className="dark:text-primary-500 font-medium text-[#ff5e2e] hover:underline"
              >
                Sign up
              </a>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

async function loginAction({ request }) {
  const formData = await request.formData();

  const { email, password } = Object.fromEntries(formData);

  const errors = {};

  if (!email) {
    errors.email = "Email cannot be empty.";
  }
  if (!password) {
    errors.password = "Password cannot be empty";
  }

  if (Object.keys(errors).length > 1) {
    return errors;
  }

  const res = await fetch("http://127.0.0.1:3000/login", {
    method: "POST",
    body: {
      email,
      password,
    },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    errors.credentials = true;
    return errors;
  }

  return null;
}

export { Login, loginAction };
