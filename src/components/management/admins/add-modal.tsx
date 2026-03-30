import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddNewAdminMutation } from "@/redux/feature/admins/adminApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";

const adminSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AdminFormValues = z.infer<typeof adminSchema>;

const AddAdminModal = () => {
  const [open, setOpen] = useState(false);
  const [addNewAdmin, { isLoading }] = useAddNewAdminMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AdminFormValues) => {
    try {
      await addNewAdmin(data).unwrap();
      SuccessToast("Admin added successfully");
      setOpen(false);
      reset();
    } catch (error) {
      const err = error as TError;
      ErrorToast(err?.data?.message || "Failed to add admin");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full">+ Add Admin</Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-xl p-0 overflow-hidden border shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold font-crimson text-center">
                Add New Admin
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Full Name</p>
                <Input 
                  placeholder="Enter full name" 
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500">{errors.fullName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Email Address</p>
                <Input 
                  placeholder="Enter email address" 
                  type="email" 
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Password</p>
                <Input 
                  placeholder="Enter password" 
                  type="password" 
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                type="submit" 
                className="min-w-40 rounded-full"
                loading={isLoading}
                loadingText="Saving..."
              >
                Save Admin
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default AddAdminModal;
