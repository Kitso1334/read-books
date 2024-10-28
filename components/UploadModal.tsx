"use client";


import { FieldValues, Form, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal =()=> {
  const [isLoading,setIsLoading]=useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
      defaultValues: {
          author: "",
          title: "",
          audiobook: null,
          image: null
      }
  });

  const onChange = (open:boolean) => {
    if (!open) {
        reset();
        uploadModal.onClose();
    }
};
const onSubmit:SubmitHandler<FieldValues> = async (values) => {
  try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const audiobookFile = values.audiobook?.[0];
      if (!imageFile || !audiobookFile || !user) {
          toast.error("Missing fields!");
          return;
      }

          

          
      const uniqueID = uniqid();

      // Upload the audiobook
      const { data: audiobookData, error: audiobookError } = await supabaseClient
          .storage
          .from("audiobooks")
          .upload(`audiobook-${values.title}-${uniqueID}`, audiobookFile, {
              cacheControl: "3600",
              upsert: false
          });

          if (audiobookError) {
            setIsLoading(false);
            return toast.error('Failed audiobook upload');
        }

        // Upload the image
        const { data: imageData, error: imageError } = await supabaseClient
            .storage
            .from("images")
            .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                cacheControl: "3600",
                upsert: false
            });
            if (imageError) {
              setIsLoading(false);
              return toast.error('Failed image upload');
          }

          // Insert data into the Supabase table
          const { error: supabaseError } = await supabaseClient
              .from('Audiobooks')
              .insert({
                  user_id: user?.id,
                  title: values.title,
                  author: values.author,
                  image_path: imageData.path,
                  audiobook_path: audiobookData.path
              });
          
              if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Audiobook created!");
            reset();
            uploadModal.onClose();

        } catch (error) {
            toast.error("Oops! Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
      <Modal
          title="Add an audiobook"
          description="Upload an audiobook file"
          isOpen={uploadModal.isOpen}
          onChange={onChange}
      >
          <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Input
                  id="title"
                  disabled={isLoading}
                  {...register("title", { required: true })}
                  placeholder="Audiobook title"
              />
              <Input
                  id="author"
                  disabled={isLoading}
                  {...register("author", { required: true })}
                  placeholder="Audiobook author"
              />
              <div>
                  <div className="pb-1">Select an audiobook file</div>
                  <Input
                      id="audiobook"
                      type="file"
                      disabled={isLoading}
                      accept=".mp3"
                      {...register("audiobook", { required: true })}
                  />
              </div>
              <div>
                  <div className="pb-1">Select an image file</div>
                  <Input
                      id="image"
                      type="file"
                      disabled={isLoading}
                      accept=".jpg"
                      {...register("image", { required: true })}
                  />
              </div>
              <Button disabled={isLoading} type="submit">
                  Create
              </Button>
          </form>
      </Modal>
  );
};

export default UploadModal;