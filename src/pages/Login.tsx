import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { SubmitButton } from "../components/SubmitButton";
import { FormError } from "../components/FormError";
import { LOCALSTORAGE_TOKEN } from "../constants";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/LoginMutation";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data: LoginMutation) => {
    const { ok, token } = data.login;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };

  const [loginMutation, { data: loginResults, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onValid = () => {
    const { email, password } = getValues();
    if (!loading) {
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-7 md:mt-24">
      <Helmet>
        <title>Login | Noicast</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-6 md:shadow md:px-20 md:py-16 md:rounded-xl">
        <h1 className="text-3xl font-bold mb-4 self-start">Login</h1>
        <h4 className="text-xl mb-7 self-start">Welcome Back :)</h4>
        <form className="flex flex-col w-full" onSubmit={handleSubmit(onValid)}>
          {/* Email */}
          <input
            className={`mt-4 mb-1 px-4 py-2 text-base border border-gray-300 transition-all duration-700 outline-none rounded-lg ${
              errors.email?.message
                ? "focus:border-red-400"
                : "focus:border-gray-600"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            placeholder="Email"
            required
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage="Please enter a valid email" />
          )}
          {/* Password */}
          <input
            className={`mt-4 mb-1 px-4 py-2 text-base border border-gray-300 transition-all duration-700 outline-none rounded-lg ${
              errors.password?.message
                ? "focus:border-red-400"
                : "focus:border-gray-600"
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: 8,
            })}
            type="password"
            placeholder="Password"
            required
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage={"Password must be more than 8 chars"} />
          )}
          {/* Login Button */}
          <SubmitButton isValid={isValid} loading={loading} text="Login" />
          {loginResults?.login.error && (
            <FormError errorMessage={loginResults.login.error} />
          )}{" "}
        </form>

        <div className="mt-4">
          {"New to Podcast? "}
          <Link to="/sign-up" className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
