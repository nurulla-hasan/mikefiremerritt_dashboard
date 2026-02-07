import PageLayout from "@/components/common/page-layout";
import {
  subscriptionsColumns,
  type Subscription,
} from "@/components/management/subscriptions/subscriptions-columns";
import { SubscriptionsFilter } from "@/components/management/subscriptions/subscriptions-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";

const Subscriptions = () => {
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between">
        <PageHeader
          title="Subscription Management"
          description="View and manage all customer subscriptions"
          length={subscriptions.length}
        />
        <SubscriptionsFilter />
      </div>
      <DataTable columns={subscriptionsColumns} data={subscriptions} meta={meta} />
    </PageLayout>
  );
};

export default Subscriptions;

const subscriptions: Subscription[] = [
  {
    id: 1,
    name: "Jollof Rice",
    email: "jollof@example.com",
    avatar: "https://i.pravatar.cc/150?u=11",
    startDate: "2024-01-12",
    expireDate: "2024-02-12",
    plan: "Monthly",
    amount: "$254",
    referrals: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Kerry Trantow",
    email: "kerry@example.com",
    avatar: "https://i.pravatar.cc/150?u=12",
    startDate: "2024-02-01",
    expireDate: "2024-03-01",
    plan: "Monthly",
    amount: "$150",
    referrals: 2,
    status: "Expired",
  },
  {
    id: 3,
    name: "Geneva Pfannerstill",
    email: "geneva@example.com",
    avatar: "https://i.pravatar.cc/150?u=13",
    startDate: "2023-12-15",
    expireDate: "2024-12-15",
    plan: "Yearly",
    amount: "$1200",
    referrals: 8,
    status: "Active",
  },
  {
    id: 4,
    name: "Everett Williamson",
    email: "everett@example.com",
    avatar: "https://i.pravatar.cc/150?u=14",
    startDate: "2024-01-20",
    expireDate: "2024-02-20",
    plan: "Monthly",
    amount: "$300",
    referrals: 12,
    status: "Active",
  },
  {
    id: 5,
    name: "Tonya Parker",
    email: "tonya@example.com",
    avatar: "https://i.pravatar.cc/150?u=15",
    startDate: "2024-02-05",
    expireDate: "2024-03-05",
    plan: "Monthly",
    amount: "$200",
    referrals: 0,
    status: "Expired",
  },
  {
    id: 6,
    name: "Jan Leuschke",
    email: "jan@example.com",
    avatar: "https://i.pravatar.cc/150?u=16",
    startDate: "2023-11-10",
    expireDate: "2024-11-10",
    plan: "Yearly",
    amount: "$999",
    referrals: 4,
    status: "Active",
  },
];

const meta = {
  total: subscriptions.length,
  page: 1,
  limit: 10,
  totalPages: Math.ceil(subscriptions.length / 10),
};
