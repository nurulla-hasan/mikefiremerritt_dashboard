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
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/ui/page-header";
import { useGetAboutUsQuery, useUpdateAboutUsMutation } from "@/redux/feature/settings/settingsApis";
import type { TError } from "@/types/global.types";

type FormValues = {
  content: string;
};

const About = () => {
  const { data: aboutData, isLoading: isFetching } = useGetAboutUsQuery({});
  const [updateAboutUs, { isLoading: isUpdating }] = useUpdateAboutUsMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      content: "",
    },
  });

  // Set initial form values when data is fetched
  useEffect(() => {
    if (aboutData?.data?.content) {
      form.reset({
        content: aboutData.data.content,
      });
    }
  }, [aboutData, form]);

  const onSubmit = async (data: FormValues) => {
    const id = aboutData?.data?.id;
    if (!id) {
      ErrorToast("About Us record not found");
      return;
    }

    try {
      await updateAboutUs({ id, data }).unwrap();
      SuccessToast("About page saved successfully");
    } catch (error) {
      const err = error as TError;
      ErrorToast(err?.data?.message || "Failed to save About page");
    }
  };

  if (isFetching) {
    return (
      <PageLayout>
        <div className="flex h-100 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader title="About Us" description="Manage the About Us page content" />

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

export default About;
