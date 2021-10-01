import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router";
import { FormError } from "../../components/FormError";
import { SubmitButton } from "../../components/SubmitButton";
import { useMe } from "../../hooks/useMe";
import { useForm } from "react-hook-form";
import {
  EditProfileMutation,
  EditProfileMutationVariables,
} from "../../__generated__/EditProfileMutation";
import { PencilAltIcon } from "@heroicons/react/solid";

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfileMutation($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IEditProfileParams {
  id: string;
}

interface IEditProfileForm {
  email: string;
  password: string;
}

export const EditProfile: React.FC = () => {
  const [readonly, setReadonly] = useState(true);
  const history = useHistory();
  const params = useParams<IEditProfileParams>();
  const { data } = useMe();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IEditProfileForm>({ mode: "onChange" });

  const onCompleted = () => {
    history.push(`/user/${params.id}`);
    history.go(0);
  };

  const [editProfileMutation, { data: editProfileResults, loading }] =
    useMutation<EditProfileMutation, EditProfileMutationVariables>(
      EDIT_PROFILE_MUTATION,
      { onCompleted }
    );

  const onValid = () => {
    if (loading) return;
    const { email, password } = getValues();
    editProfileMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
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
          <div className="relative flex flex-row">
            <input
              className={`w-full mt-4 mb-1 px-4 py-2 text-base border border-gray-300 transition-all duration-700 outline-none rounded-lg ${
                errors.email?.message
                  ? "focus:border-red-400"
                  : "focus:border-gray-600"
              } ${readonly ? "bg-gray-100" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              defaultValue={data?.me.email}
              readOnly={readonly}
              type="email"
              placeholder="Email"
              required
            />
            <PencilAltIcon
              onClick={() => setReadonly(false)}
              className="w-5 text-gray-600 opacity-70 absolute z-10 cursor-pointer right-3 bottom-4"
            />
          </div>
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
          {/* Save Button */}
          <SubmitButton isValid={isValid} loading={loading} text="Save" />
          {editProfileResults?.updateProfile.error && (
            <FormError errorMessage={editProfileResults.updateProfile.error} />
          )}{" "}
        </form>
      </div>
    </div>
  );
};
