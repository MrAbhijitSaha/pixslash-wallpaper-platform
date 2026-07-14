"use client";

import { Button } from "@/components/shadcnui/button";
import { Spinner } from "@/components/shadcnui/spinner";
import { LoginSchemaType } from "@/lib/type";
import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FieldLogin from "./FieldLogin";

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      emailAddress: "",
      password: "",
      rememberMe: false,
    },

    mode: "onSubmit",
  });

  const submitLoginData = (slData: LoginSchemaType) => {
    // TODO: replace with actual registration API call
    console.log(slData);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(submitLoginData)}
      className="space-y-4"
      noValidate>
      {/* user email address field  */}
      <FieldLogin
        control={control}
        name="emailAddress"
        label="Email Address"
        type="email"
        placeholder="Email address"
        autoComplete="email"
      />

      {/* user password field  */}
      <FieldLogin
        control={control}
        name="password"
        label="Password"
        type="password"
        placeholder="Password"
        autoComplete="off"
      />

      {/* Remember Me checkbox */}
      <FieldLogin
        control={control}
        name="rememberMe"
        label="Remember me"
        type="checkbox"
      />

      {/* submit button  */}
      <Button
        type="submit"
        className="w-full py-4"
        disabled={isSubmitting}>
        {isSubmitting ?
          <Spinner />
        : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
