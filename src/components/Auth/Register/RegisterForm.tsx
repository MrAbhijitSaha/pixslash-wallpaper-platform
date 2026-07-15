"use client";

import { authClient } from "@/lib/auth-client";
import { RegisterSchemaType } from "@/lib/type";
import { registerSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../shadcnui/button";
import { Spinner } from "../../shadcnui/spinner";
import FieldRegister from "./FieldRegister";

const RegisterForm = () => {
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
    },

    mode: "all",
  });

  const submitRegisterData = async ({
    name,
    emailAddress,
    password,
  }: RegisterSchemaType) => {
    try {
      const { error } = await authClient.signUp.email({
        name,
        email: emailAddress,
        password,
      });

      if (error) {
        console.error(error);
        toast.error("Registration failed. Please try again.");
      } else {
        toast.success("Registration successful!");

        reset();

        push("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitRegisterData)}
      className="space-y-3"
      noValidate>
      {/* user full name field  */}
      <FieldRegister
        control={control}
        name="name"
        label="Name"
        type="text"
        placeholder="Full name"
        autoComplete="name"
      />

      {/* user email address field  */}
      <FieldRegister
        control={control}
        name="emailAddress"
        label="Email Address"
        type="email"
        placeholder="Email address"
        autoComplete="email"
      />

      {/* user password field  */}
      <FieldRegister
        control={control}
        name="password"
        label="Password"
        type="password"
        placeholder="Password"
        autoComplete="off"
      />

      {/* user confirm password field  */}
      <FieldRegister
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        autoComplete="off"
      />

      {/* submit button  */}
      <Button
        type="submit"
        className="w-full py-4"
        disabled={isSubmitting || !isValid}>
        {isSubmitting ?
          <Spinner />
        : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
