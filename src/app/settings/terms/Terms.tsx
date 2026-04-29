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
import { useGetTermsConditionsQuery, useUpdateTermsConditionsMutation } from "@/redux/feature/settings-api/settingsApis";
import type { TError } from "@/types/global.types";

type FormValues = {
  content: string;
};

const Terms = () => {
  const { data: termsData, isLoading: isFetching } = useGetTermsConditionsQuery({});
  const [updateTermsConditions, { isLoading: isUpdating }] = useUpdateTermsConditionsMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      content: "",
    },
  });

  // Set initial form values when data is fetched
  useEffect(() => {
    if (termsData?.data) {
      // Handle both array and object response
      const content = Array.isArray(termsData.data)
        ? termsData.data[0]?.content
        : termsData.data?.content;

      if (content) {
        form.reset({
          content: content,
        });
      }
    }
  }, [termsData, form]);

  const onSubmit = async (data: FormValues) => {
    const id = Array.isArray(termsData?.data)
      ? termsData.data[0]?.id
      : termsData?.data?.id;

    if (!id) {
      ErrorToast("Terms and Conditions record not found");
      return;
    }

    try {
      await updateTermsConditions({ id, data }).unwrap();
      SuccessToast("Terms and Conditions saved successfully");
    } catch (error) {
      const err = error as TError;
      ErrorToast(err?.data?.message || "Failed to save Terms and Conditions");
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
      <PageHeader title="Terms and Conditions" description="Manage the Terms and Conditions page content" />

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

export default Terms;
