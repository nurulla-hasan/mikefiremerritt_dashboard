import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/page-header";
import { useGetContactUsInfoQuery, useUpdateContactUsInfoMutation } from "@/redux/feature/settings-api/settingsApis";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, GlobeLock } from "lucide-react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading.json";

const Contact = () => {
  const { data: contactData, isLoading } = useGetContactUsInfoQuery(undefined);
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactUsInfoMutation();

  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    location: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: ""
  });

  const hasLoadedData = useRef(false);

  useEffect(() => {
    if (contactData?.data && !hasLoadedData.current) {
      const data = contactData.data;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        location: data.location || "",
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        twitter: data.twitter || "",
        linkedin: data.linkedin || ""
      });
      hasLoadedData.current = true;
    }
  }, [contactData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData?.data?.id) return;

    try {
      await updateContact({
        id: contactData.data.id,
        data: formData
      }).unwrap();
      SuccessToast("Contact information updated successfully");
    } catch (error) {
      const err = error as { data?: { message?: string } };
      ErrorToast(err?.data?.message || "Failed to update contact information");
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex h-[calc(100vh-200px)] items-center justify-center">
          <Lottie animationData={loadingAnimation} className="w-50 h-50" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader
        title="Contact Us Info Management"
        description="Manage the contact information and social links"
      />
      <form onSubmit={handleSubmit} className="w-full space-y-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Basic Info */}
          <div className="bg-card border rounded-lg p-6 space-y-4 shadow-sm">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" /> Basic Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="support@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="flex items-center gap-2"><Phone className="w-4 h-4" /> Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1 234 567 890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="123 Main Street, New York, USA"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-card border rounded-lg p-6 space-y-4 shadow-sm">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <GlobeLock className="w-5 h-5 text-primary" /> Social Links
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook" className="flex items-center gap-2"><Facebook className="w-4 h-4" /> Facebook</Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/example"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram" className="flex items-center gap-2"><Instagram className="w-4 h-4" /> Instagram</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/example"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter" className="flex items-center gap-2"><Twitter className="w-4 h-4" /> Twitter/X</Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="https://twitter.com/example"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/company/example"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-start">
          <Button
            type="submit"
            loading={isUpdating}
            loadingText="Updating..."
          >
            Update Information
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

export default Contact;
