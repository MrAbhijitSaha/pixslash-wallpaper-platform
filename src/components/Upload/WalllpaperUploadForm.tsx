"use client";

import { WallpaperUploadSchemaType } from "@/lib/type";
import { wallpaperUploadSchema } from "@/lib/zodSchema";
import wallpaperUploadAction from "@/server/wallpaperUploadAction";
import { Category } from "@generated/prisma/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderIcon, ImagePlusIcon, ShieldCheckIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { Button } from "../shadcnui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcnui/card";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../shadcnui/select";
import { Spinner } from "../shadcnui/spinner";

type WalllpaperUploadFormType = {
  categoryInfo: Category[];
};

const WalllpaperUploadForm = ({ categoryInfo }: WalllpaperUploadFormType) => {
  const [isFile, setFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refresh } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm<WallpaperUploadSchemaType>({
    resolver: zodResolver(wallpaperUploadSchema),

    defaultValues: {
      title: "",
      category: "",
    },

    mode: "onChange",
  });

  //   file picker initilization
  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",
    onFilesSelected: () => setFile(true),
    onClear: () => setFile(false),
  });

  // submit function
  const submitWallpaper = async ({
    title,
    category,
  }: WallpaperUploadSchemaType) => {
    if (plainFiles.length === 0) {
      return toast.error("Please select an image to upload.");
    }

    const formData = new FormData();

    // Image
    formData.append("image", plainFiles[0]);

    // Other fields
    formData.append("title", title);
    formData.append("category", category);

    const { isSuccess, message } = await wallpaperUploadAction(formData);

    if (!isSuccess) {
      toast.error(message);
    } else {
      toast.success(message);
      reset();
      clear();
      refresh();
    }
  };

  // cancel function
  const cancelHandler = () => {
    setLoading(true);
    reset();
    clear();
    setLoading(false);
  };

  return (
    <Card className="mb-14 w-auto max-w-150 gap-2 md:w-140 lg:mb-0 lg:w-full lg:pt-10">
      <CardHeader>
        <CardTitle className="text-3xl">Upload To Pixslash</CardTitle>
        <CardDescription>
          Share Your Creativity with the community
        </CardDescription>
      </CardHeader>

      {/* starc form  */}
      <form
        onSubmit={handleSubmit(submitWallpaper)}
        className="grid grid-cols-1 gap-3"
        noValidate>
        <CardContent className="space-y-3">
          {/* choose Image  */}
          <section className="grid place-items-center rounded-md">
            {!isFile && (
              <div
                onClick={openFilePicker}
                className="border-muted-foreground/30 bg-muted/20 hover:border-primary hover:bg-muted/40 flex h-auto w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-4 transition-colors">
                <div className="bg-primary/10 rounded-full p-4">
                  <ImagePlusIcon className="text-primary size-10" />
                </div>

                <h3 className="text-lg font-semibold">Upload Wallpaper</h3>

                <p className="text-muted-foreground text-center text-sm">
                  Click to browse your image
                </p>

                <Button
                  variant="default"
                  type="button">
                  <FolderIcon /> Choose Image
                </Button>

                <p className="text-muted-foreground text-center text-xs">
                  PNG, JPG, JPEG, WEBP <br /> Max size 10mb Recommended: 4k
                  reolution
                </p>
              </div>
            )}

            {/* Selected image preview */}
            {filesContent.map((file, index) => (
              <div
                className="border-muted-foreground/30 bg-muted/20 hover:border-primary hover:bg-muted/40 flex h-72 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors"
                key={index}>
                <Image
                  src={file.content}
                  alt={file.name}
                  height={450}
                  width={450}
                  onClick={openFilePicker}
                  className="mx-auto h-60 w-full cursor-pointer rounded-md object-contain"
                />
              </div>
            ))}
          </section>

          {/* form fill section  */}

          {/*  Wallpaper Title  */}
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter wallpaper title"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/*  Wallpaper Category  */}
          <Controller
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Category</FieldLabel>

                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}>
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="min-w-30">
                    <span data-slot="select-value">
                      {categoryInfo.find((cat) => cat.id === field.value)
                        ?.categoryName || "Select a category"}
                    </span>
                  </SelectTrigger>

                  <SelectContent>
                    {categoryInfo.length === 0 ?
                      <SelectItem
                        value=""
                        disabled>
                        No categories available
                      </SelectItem>
                    : categoryInfo.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.id}>
                          {item.categoryName}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          {/* trust text section  */}
          <div className="flex items-center gap-2">
            <ShieldCheckIcon />
            By uploading, you accept our Terms of Service.
          </div>

          {/* button section  */}
          <div className="grid w-full gap-2 lg:w-auto lg:grid-cols-2">
            <Button
              type="button"
              variant="destructive"
              className="w-full"
              onClick={cancelHandler}
              disabled={(!isFile && !isDirty) || loading}>
              {loading ?
                <>
                  <Spinner /> Caneling ...
                </>
              : <>Cancel</>}
            </Button>

            <Button
              type="submit"
              className="w-full"
              disabled={!isFile || isSubmitting}>
              {isSubmitting ?
                <>
                  <Spinner /> Uploading ...
                </>
              : <>Upload</>}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default WalllpaperUploadForm;
