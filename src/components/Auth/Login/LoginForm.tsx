"use client";

import { Button } from "@/components/shadcnui/button";
import { Spinner } from "@/components/shadcnui/spinner";
import { authClient } from "@/lib/auth-client";
import { LoginSchemaType } from "@/lib/type";
import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FieldLogin from "./FieldLogin";

const LoginForm = () => {
  const { push, refresh } = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      emailAddress: "",
      password: "",
      rememberMe: false,
    },

    mode: "all",
  });

  const submitLoginData = async ({
    emailAddress,
    password,
    rememberMe,
  }: LoginSchemaType) => {
    try {
      const { error } = await authClient.signIn.email({
        email: emailAddress,
        password,
        rememberMe,
      });

      if (error) {
        console.error(error);
        toast.error("Login failed. Please try again.");
      } else {
        toast.success("Login successful!");

        reset();

        push("/wallpapers");
        refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    }
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
        disabled={isSubmitting || !isValid}>
        {isSubmitting ?
          <Spinner />
        : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
