import PageLayout from "@/components/common/page-layout";
import ChangePasswordForm from "@/components/settings/change-password-form";
import EditProfileForm from "@/components/settings/edit-profile-form";
import ProfileHeader from "@/components/settings/profile-header";
import { useGetMeQuery } from "@/redux/feature/auth/authApis";
import { Skeleton } from "@/components/ui/skeleton";
import type { IUser } from "@/types/user";

const Profile = () => {
  const { data: profileData, isLoading } = useGetMeQuery(undefined);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-125 w-full rounded-xl" />
            <Skeleton className="h-125 w-full rounded-xl" />
          </div>
        </div>
      </PageLayout>
    );
  }

  const user = profileData?.data as IUser;

  return (
    <PageLayout>
      <div className="space-y-6">
        <ProfileHeader user={user} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EditProfileForm user={user} />
          <ChangePasswordForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
