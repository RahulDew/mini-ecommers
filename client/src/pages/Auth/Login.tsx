import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../config/config";
import { SubmitHandler, useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
import { useAuthContext } from "../../context/AuthContext";

interface IFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();
  // const { checkAuthStatus } = useAuth();
  const { checkAuthStatus } = useAuthContext();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const { email, password } = data;

    setAuthLoading(true);
    try {
      const res = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });
      const data = await res.json();
      if (res.ok) {
        checkAuthStatus();
        navigate("/");
      } else {
        setAuthError(data.message);
      }
    } catch (error) {
      setAuthError("Something went wrong");
    } finally {
      setAuthLoading(false);
      reset();
    }
  };

  return (
    <div className="w-full min-h-screen text-center px-5 md:px-10 flex justify-center lg:px-16 py-6  duration-300">
      <div className="sm:mx-auto w-full sm:max-w-sm">
        <div className="text-black ">
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight">
            Welcome back
          </h2>
        </div>

        <div className="mt-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 text-black"
          >
            {/* input email */}
            <div className="flex flex-col justify-start items-start">
              <label className="text-base font-medium leading-6">
                Email address
              </label>
              <div className="mt-2 w-full">
                <input
                  type="email"
                  id="email"
                  placeholder="Ex. johndoe@email.com"
                  className="w-full rounded-lg p-2 text-[17px] outline-none text-black bg-transparent border-2 border-black focus:border-indigo-600 duration-300"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* input password */}
            <div className="relative flex flex-col justify-start items-start">
              <label className="text-base font-medium leading-6">
                Password
              </label>
              <div className="mt-2 w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Ex. ......"
                  className="w-full rounded-lg p-2 text-[17px] outline-none text-black bg-transparent border-2 border-black focus:border-indigo-600 duration-300"
                  {...register("password", {
                    required: true,
                    validate: {
                      checkLength: (value) =>
                        value.length >= 6 && value.length <= 30,
                      matchPattern: (value) =>
                        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                          value
                        ),
                    },
                  })}
                />

                {/* password visibility changer */}
                <div
                  onClick={() =>
                    setShowPassword((prevShowPassword) => !prevShowPassword)
                  }
                  className="absolute right-3 top-11 text-[22px] hover:text-indigo-600 duration-200 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.type === "required"
                    ? "Password is required."
                    : errors.password.type === "checkLength"
                    ? "Password must be between 6 and 30 characters."
                    : "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."}
                </p>
              )}
            </div>

            {/* submit button */}
            <div>
              <button
                type="submit"
                className="w-full rounded-lg p-2 mt-5 text-[17px] outline-none bg-black border-2 border-indigo-600 duration-300  hover:bg-indigo-600 hover:border-indigo-600 text-white font-semibold"
              >
                {authLoading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill=""
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          {/* authentication error */}
          <h3 className="my-3 font-semibold text-red-500">
            {authError && authError}
          </h3>

          <hr className=" border-indigo-600 my-5" />

          {/* navigate to login page */}
          <p className="mt-5 text-center text-sm text-black">
            Not Registred?
            <Link
              to={"/register"}
              className="font-semibold mx-2 leading-6 text-indigo-500 hover:text-indigo-700 underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
