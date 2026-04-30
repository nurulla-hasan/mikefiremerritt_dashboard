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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createSpecialty, { isLoading: isCreating }] = useCreateSpecialtyMutation();
  const [updateSpecialty, { isLoading: isUpdating }] = useUpdateSpecialtyMutation();

  useEffect(() => {
    if (specialty) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSpecialtyName(specialty.specialtyName);
      setIsActive(specialty.isActive);
      setImage(specialty.specialtyImage);
    } else {
      setSpecialtyName("");
      setIsActive(true);
      setImage(null);
    }
  }, [specialty, open]);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        ErrorToast("Image size must be less than 2MB");
        return;
      }
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
    
    formData.append("bodyData", JSON.stringify({ specialtyName, isActive }));

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
      setIsActive(true);
    } catch (error: any) {
      ErrorToast(error?.data?.message || `Failed to ${specialty ? "update" : "add"} specialty`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Add Specialty</Button>}
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-md p-6 overflow-hidden border">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold font-crimson text-center">
              {specialty ? "Update Specialty" : "Add New Specialty"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2 flex flex-col items-center">
              <p className="text-sm font-medium self-start">Specialty Image</p>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative aspect-square w-40 border-2 border-dashed rounded-xl flex items-center justify-center bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors overflow-hidden"
              >
                {image ? (
                  <>
                    <img src={image} alt="Preview" className="h-full w-full object-cover" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeImage(); }}
                      className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full shadow-lg"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground p-4">
                    <ImagePlus className="h-8 w-8" />
                    <span className="text-[10px] text-center">Click to upload square image</span>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground">Recommended ratio 1:1 (Square) • Max 2MB</p>
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

            <div className="flex items-center justify-between p-3 border rounded-xl bg-muted/20">
              <div className="space-y-0.5">
                <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                <p className="text-[10px] text-muted-foreground">
                  {isActive ? "Specialty is currently active" : "Specialty is currently inactive"}
                </p>
              </div>
              <Switch 
                id="status" 
                checked={isActive} 
                onCheckedChange={setIsActive}
              />
            </div>

            <div className="flex justify-center pt-2">
              <Button 
                className="w-full" 
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
