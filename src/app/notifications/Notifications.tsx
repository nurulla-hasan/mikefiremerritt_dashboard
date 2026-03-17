import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, CheckCircle2, Info, AlertTriangle, Clock, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, timeAgo, SuccessToast, ErrorToast } from "@/lib/utils";
import { 
  useGetNotificationsQuery, 
  useMarkAsReadMutation, 
  useMarkSingleAsReadMutation,
  useClearAllNotificationsMutation 
} from "@/redux/feature/notifications/notificationApis";

const getIcon = (title: string) => {
  const lowercaseTitle = title.toLowerCase();
  if (lowercaseTitle.includes("success") || lowercaseTitle.includes("approved")) {
    return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  }
  if (lowercaseTitle.includes("warning") || lowercaseTitle.includes("alert")) {
    return <AlertTriangle className="h-5 w-5 text-amber-500" />;
  }
  if (lowercaseTitle.includes("error") || lowercaseTitle.includes("failed") || lowercaseTitle.includes("security")) {
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  }
  return <Info className="h-5 w-5 text-blue-500" />;
};

const Notifications = () => {
  const { data: response, isLoading, isFetching } = useGetNotificationsQuery();
  const [markAsRead, { isLoading: isMarkingRead }] = useMarkAsReadMutation();
  const [markSingleAsRead] = useMarkSingleAsReadMutation();
  const [clearAll, { isLoading: isClearing }] = useClearAllNotificationsMutation();

  const notifications = response?.data || [];

  const handleMarkAllRead = async () => {
    if (notifications.length === 0) return;
    try {
      await markAsRead().unwrap();
      SuccessToast("All notifications marked as read");
    } catch (error) {
      const err = error as { data?: { message?: string } };
      ErrorToast(err?.data?.message || "Failed to mark notifications as read");
    }
  };

  const handleMarkSingleRead = async (id: string, isRead: boolean) => {
    if (isRead) return;
    try {
      await markSingleAsRead(id).unwrap();
    } catch (error) {
      const err = error as { data?: { message?: string } };
      ErrorToast(err?.data?.message || "Failed to mark notification as read");
    }
  };

  const handleClearAll = async () => {
    if (notifications.length === 0) return;
    try {
      await clearAll().unwrap();
      SuccessToast("All notifications cleared");
    } catch (error) {
      const err = error as { data?: { message?: string } };
      ErrorToast(err?.data?.message || "Failed to clear notifications");
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <PageHeader title="Notifications" description="Manage and view your notifications." />
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={handleMarkAllRead}
              disabled={isMarkingRead || notifications.length === 0}
            >
              <CheckCircle2 className="h-4 w-4" />
              {isMarkingRead ? "Marking..." : "Mark all as read"}
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              className="gap-2"
              onClick={handleClearAll}
              disabled={isClearing || notifications.length === 0}
            >
              <Trash2 className="h-4 w-4" />
              {isClearing ? "Clearing..." : "Clear all"}
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={cn(
                "border-none shadow-sm transition-all duration-200 hover:shadow-md",
                !notification.isRead ? "bg-primary/5 ring-1 ring-primary/10" : "bg-background/50"
              )}
              // onClick={() => handleMarkSingleRead(notification.id, notification.isRead)}
            >
              <CardContent className="p-4 flex gap-4">
                <div className={cn(
                  "p-2 rounded-full shrink-0 h-fit",
                  !notification.isRead ? "bg-background shadow-sm" : "bg-muted/50"
                )}>
                  {getIcon(notification.title)}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className={cn(
                        "font-semibold text-sm md:text-base",
                        !notification.isRead ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <Badge variant="default" className="h-2 w-2 rounded-full p-0 bg-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs gap-1 text-primary hover:text-primary hover:bg-primary/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkSingleRead(notification.id, notification.isRead);
                          }}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Mark as read
                        </Button>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                        <Clock className="h-3 w-3" />
                        {timeAgo(notification.createdAt)}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {notification.body}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {notifications.length === 0 && !isFetching && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="p-6 bg-muted rounded-full">
              <Bell className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">No notifications yet</h3>
              <p className="text-muted-foreground max-w-xs">
                When you receive notifications, they will appear here.
              </p>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Notifications;
