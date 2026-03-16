/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, type ReactNode } from "react";
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
import { ImagePlus, X } from "lucide-react";
import { useCreateSpecialtyMutation, useUpdateSpecialtyMutation } from "@/redux/feature/specialties/specialtyApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { Specialty } from "./specialties-columns";

interface AddSpecialtyModalProps {
  specialty?: Specialty;
  trigger?: ReactNode;
}

const AddSpecialtyModal = ({ specialty, trigger }: AddSpecialtyModalProps) => {
  const [open, setOpen] = useState(false);
  const [specialtyName, setSpecialtyName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createSpecialty, { isLoading: isCreating }] = useCreateSpecialtyMutation();
  const [updateSpecialty, { isLoading: isUpdating }] = useUpdateSpecialtyMutation();

  useEffect(() => {
    if (specialty) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSpecialtyName(specialty.specialtyName);
      setImage(specialty.specialtyImage);
    } else {
      setSpecialtyName("");
      setImage(null);
    }
  }, [specialty, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!specialtyName.trim()) {
      ErrorToast("Specialty name is required");
      return;
    }

    if (!image && !specialty) {
      ErrorToast("Specialty image is required");
      return;
    }

    const formData = new FormData();
    if (imageFile) {
      formData.append("specialtyImage", imageFile);
    }
    
    formData.append("bodyData", JSON.stringify({ specialtyName }));

    try {
      if (specialty) {
        await updateSpecialty({ id: specialty.id, data: formData }).unwrap();
        SuccessToast("Specialty updated successfully");
      } else {
        await createSpecialty(formData).unwrap();
        SuccessToast("Specialty added successfully");
      }
      setOpen(false);
      removeImage();
      setSpecialtyName("");
    } catch (error: any) {
      ErrorToast(error?.data?.message || `Failed to ${specialty ? "update" : "add"} specialty`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button className="rounded-full">+ Add Specialty</Button>}
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-md p-6 overflow-hidden border shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold font-crimson text-center">
              {specialty ? "Update Specialty" : "Add New Specialty"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2 text-center">
              <p className="text-sm font-medium">Specialty Image</p>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative h-40 w-full border-2 border-dashed rounded-xl flex items-center justify-center bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors overflow-hidden"
              >
                {image ? (
                  <>
                    <img src={image} alt="Preview" className="h-full w-full object-cover" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeImage(); }}
                      className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full shadow-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImagePlus className="h-10 w-10" />
                    <span className="text-xs">Click to upload image</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Specialty Name</p>
              <Input 
                placeholder="e.g. Yoga, CrossFit, HIIT" 
                value={specialtyName}
                onChange={(e) => setSpecialtyName(e.target.value)}
              />
            </div>

            <div className="flex justify-center pt-2">
              <Button 
                className="w-full rounded-full" 
                onClick={handleSubmit}
                disabled={isCreating || isUpdating}
              >
                {isCreating || isUpdating ? (specialty ? "Updating..." : "Saving...") : (specialty ? "Update Specialty" : "Save Specialty")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default AddSpecialtyModal;
