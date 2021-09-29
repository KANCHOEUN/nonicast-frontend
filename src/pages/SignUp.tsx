import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { MicrophoneIcon, PhoneIcon } from "@heroicons/react/solid";
import { FormError } from "../components/FormError";
import { UserRole } from "../__generated__/globalTypes";
import { Button } from "../components/Button";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../__generated__/CreateAccountMutation";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

export const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const history = useHistory();
  const onCompleted = (data: CreateAccountMutation) => {
    if (data.createAccount.ok) history.push("/");
  };
  const [createAccountMutation, { data: createAccountResult, loading }] =
    useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
      CREATE_ACCOUNT_MUTATION,
      { onCompleted }
    );

  const onValid = () => {
    if (loading) return;
    const { email, password, role } = getValues();
    createAccountMutation({
      variables: {
        createAccountInput: {
          email,
          password,
          role,
        },
      },
    });
  };

  return (
    <div className="flex flex-col items-center mt-7 md:mt-24">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-6 md:shadow md:px-20 md:py-16 md:rounded-xl">
        <h1 className="text-3xl font-bold mb-4 self-start">Sign Up</h1>
        <h4 className="text-xl mb-7 self-start">Welcome :)</h4>

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
          <hr className="mx-7 my-5" />
          {/* Role */}
          <div className="flex">
            <input
              {...register("role", { required: true })}
              type="radio"
              className="hidden"
              id="host"
              name="role"
              required
              value={UserRole.Host}
            />
            <label
              className={`flex justify-center cursor-pointer bg-white rounded-l-lg w-6/12 p-3 transition-color duration-500 border border-gray-300 ${
                watch("role") === UserRole.Host ? "text-white bg-gray-900" : ""
              }`}
              htmlFor="host"
            >
              <MicrophoneIcon className="w-4" />
              &nbsp; HOST
            </label>

            <input
              {...register("role", { required: true })}
              type="radio"
              className="hidden"
              id="listener"
              name="role"
              required
              value={UserRole.Listener}
            />
            <label
              className={`flex justify-center cursor-pointer bg-white rounded-r-lg w-6/12 p-3 transition-color duration-500 border border-gray-300 ${
                watch("role") === UserRole.Listener
                  ? "text-white bg-gray-900"
                  : "border border-gray-300"
              }`}
              htmlFor="listener"
            >
              <PhoneIcon className="w-4" />
              &nbsp; LISTENER
            </label>
          </div>

          <Button isValid={isValid} loading={loading} text="Sign Up" />
          {createAccountResult?.createAccount.error && (
            <FormError errorMessage={createAccountResult.createAccount.error} />
          )}
        </form>
        <div className="mt-4">
          {"Already use Podcast? "}
          <Link to="/" className="text-green-400 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
