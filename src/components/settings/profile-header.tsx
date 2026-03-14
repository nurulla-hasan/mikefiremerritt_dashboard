import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Camera, Loader2, Upload, X } from "lucide-react";
import type { IUser } from "@/types/user";
import { useRef, useState } from "react";
import { useUpdateProfileImageMutation } from "@/redux/feature/auth/authApis";
import type { TError } from "@/types/global.types";
import { Button } from "../ui/button";
import { ErrorToast, SuccessToast } from "@/lib/utils";

interface ProfileHeaderProps {
  user?: IUser;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const [updateProfileImage, { isLoading }] = useUpdateProfileImageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      await updateProfileImage(formData).unwrap();
      SuccessToast("Profile image updated successfully");
      handleCancel();
    } catch (error) {
      const err = error as TError;
      ErrorToast(err?.data?.message || "Failed to update profile image");
    }
  };

  return (
    <Card className="mb-6 overflow-hidden border-none shadow-sm bg-linear-to-r from-primary/10 via-background to-background">
      <CardContent className="p-6">
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-background shadow-xl">
                <AvatarImage src={previewImage || user?.image || ""} alt={user?.fullName} className="object-cover" />
                <AvatarFallback className="text-3xl font-bold bg-primary/5 text-primary">
                  {user?.fullName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              
              {/* Camera Icon - Always visible on mobile, hover on desktop */}
              <button 
                onClick={handleIconClick}
                className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer border-2 border-background"
                title="Change profile picture"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Action Buttons when image selected */}
            {previewImage && (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <Button 
                  size="icon-xs"
                  variant="default"
                  className="rounded-full"
                  onClick={handleUpload}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                </Button>
                <Button 
                  size="icon-xs"
                  variant="outline"
                  className="text-destructive rounded-full"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>
          
          <div className="flex-1 flex flex-col gap-3 items-center md:items-start text-center md:text-left pt-2">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
                {user?.fullName || "User Name"}
              </h1>
              <Badge variant="secondary" className="px-2 py-0 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border-none">
                Super Admin
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/50">
              <Mail className="h-3.5 w-3.5" />
              <span className="text-sm font-medium">{user?.email || "N/A"}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
