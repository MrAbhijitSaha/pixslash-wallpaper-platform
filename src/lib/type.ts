import { ReactNode } from "react";
import z from "zod";
import { registerSchema } from "./zodSchema";

export type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export type LayoutChildrenProps = Readonly<{
  children: ReactNode;
}>;

export type Swatch = {
  id: string;
  kind: "phone" | "desktop";
  position: string;
  gradient: string;
  delay: string;
  duration: string;
  faded?: boolean;
};

export type RegisterSchemaType = z.infer<typeof registerSchema>;
