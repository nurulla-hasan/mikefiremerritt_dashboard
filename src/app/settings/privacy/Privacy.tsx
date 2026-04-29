import PageLayout from "@/components/common/page-layout";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TiptapEditor from "@/components/ui/tiptap-editor";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading.json";
import PageHeader from "@/components/ui/page-header";
import { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } from "@/redux/feature/settings-api/settingsApis";
import type { TError } from "@/types/global.types";

type FormValues = {
  content: string;
};

const Privacy = () => {
  const { data: privacyData, isLoading: isFetching } = useGetPrivacyPolicyQuery({});
  const [updatePrivacyPolicy, { isLoading: isUpdating }] = useUpdatePrivacyPolicyMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      content: "",
    },
  });

  // Set initial form values when data is fetched
  useEffect(() => {
    if (privacyData?.data?.content) {
      form.reset({
        content: privacyData.data.content,
      });
    }
  }, [privacyData, form]);

  const onSubmit = async (data: FormValues) => {
    const id = privacyData?.data?.id;
    if (!id) {
      ErrorToast("Privacy Policy record not found");
      return;
    }

    try {
      await updatePrivacyPolicy({ id, data }).unwrap();
      SuccessToast("Privacy Policy saved successfully");
    } catch (error) {
      const err = error as TError;
      ErrorToast(err?.data?.message || "Failed to save Privacy Policy");
    }
  };

  if (isFetching) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Lottie animationData={loadingAnimation} className="w-50 h-50" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader title="Privacy Policy" description="Manage the Privacy Policy page content" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="p-0 mb-4">
            <CardContent className="p-0">
              <div className="bg-card p-3 rounded-xl border shadow-sm">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <TiptapEditor
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                      <FormMessage className="p-4" />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              loading={isUpdating}
              loadingText="Saving..."
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </PageLayout>
  );
};

export default Privacy;
