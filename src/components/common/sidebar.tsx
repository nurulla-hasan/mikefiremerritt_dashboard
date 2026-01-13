import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  LayoutGrid,
  Settings,
  LogOut,
  ChevronDown,
  UserRoundPen,
  BadgeInfo,
  ReceiptText,
  GlobeLock,
  Home,
  Mail,
  Navigation as NavigationIcon,
  PanelBottom,
  BookOpen,
  Globe,
  ListOrdered,
  Users,
  UserCog,
  Tags,
  Contact,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useDispatch } from "react-redux";
// import { setAccessToken, setAdmin } from "@/redux/feature/auth/authSlice";
import { Button } from "../ui/button";

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}) => {
  // const dispatch = useDispatch();
  const location = useLocation();
  const prevLocation = useRef(location);
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const [isWebsiteOpen, setIsWebsiteOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const section = location.pathname.split("/")[1] || "";
  const isSettingsPath = section === "settings";
  const isManagementPath = section === "management";
  const isWebsitePath = section === "website";

  useEffect(() => {
    if (prevLocation.current !== location && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    prevLocation.current = location;
  }, [location, isSidebarOpen, setIsSidebarOpen]);

  // const handleLogout = () => {
  //     dispatch(setAdmin(null));
  //     dispatch(setAccessToken(null));
  //     localStorage.removeItem("accessToken");
  //     window.location.href = "/auth/login";
  // };

  const navItems = useMemo(
    () => [{ name: "Dashboard", icon: LayoutGrid, href: "/" }],
    []
  );

  const websiteItems = useMemo(
    () => [
      { name: "Homepage", icon: Home, href: "/website/homepage" },
      { name: "Contact", icon: Mail, href: "/website/contact" },
      { name: "Navigation", icon: NavigationIcon, href: "/website/navigation" },
      { name: "Footer", icon: PanelBottom, href: "/website/footer" },
    ],
    []
  );

  const userManagementItems = [
    { name: "User Management", icon: Users, href: "/management/users" },
    { name: "Trainer Management", icon: UserCog, href: "/management/trainers" },
  ];

  const businessManagementItems = [
    { name: "Program Management", icon: BookOpen, href: "/management/programs" },
    { name: "Gym Management", icon: Globe, href: "/management/gyms" },
  ];

  const moderationItems = [
    {
      name: "Newsfeed Moderation",
      icon: Contact,
      href: "/management/newsfeed",
    },
    {
      name: "Manage Subscription",
      icon: Tags,
      href: "/management/subscriptions",
    },
  ];

  const supportItems = [
    { name: "Manage Ticket", icon: ListOrdered, href: "/management/tickets" },
    { name: "Reviews", icon: ReceiptText, href: "/management/reviews" },
  ];

  const managementItems = [
    ...userManagementItems,
    ...businessManagementItems,
    ...moderationItems,
    ...supportItems,
  ];

  const settingsSubItems = useMemo(
    () => [
      { name: "Profile", icon: UserRoundPen, href: "/settings/profile" },
      { name: "About", icon: BadgeInfo, href: "/settings/about" },
      { name: "Terms", icon: ReceiptText, href: "/settings/terms" },
      { name: "Privacy", icon: GlobeLock, href: "/settings/privacy" },
    ],
    []
  );

  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen bg-sidebar text-sidebar-foreground w-64 transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 flex flex-col`}
    >
      <div className="p-4">
        {/* <img src="/images/logo.png" alt="" className="dark:brightness-[400]" /> */}
        <h1 className="text-2xl font-bold tracking-wider p-4">POPY LIBRARY</h1>
      </div>
      <ScrollArea className="h-[calc(100vh-149px)]">
        <nav className="grow space-y-3 p-4">
          {/* Dashboard */}
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className={({ isActive }) =>
                `w-full flex items-center justify-start p-2 rounded-sm text-sm font-medium transition-colors duration-200
                    ${
                      isActive
                        ? "border-x-2 border-primary bg-primary/20"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }
                            `
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="mr-2 w-4 h-4" />
              {item.name}
            </NavLink>
          ))}

          {/* Management group */}
          <Collapsible defaultOpen={isManagementOpen}>
            <CollapsibleTrigger
              onClick={() => setIsManagementOpen(!isManagementOpen)}
              className={`w-full flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200 
                    ${
                      isManagementPath
                        ? "border-x-2 border-primary bg-primary/20"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }
                            `}
            >
              <div className="flex items-center text-sm px-2">
                <ListOrdered className="mr-2 h-4 w-4" />
                Management
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isManagementOpen ? "-rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="py-2 space-y-2">
              {managementItems.map((item, index) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "both",
                  }}
                  className={({ isActive }) =>
                    `animate-fade-in-up w-[90%] ml-5 flex items-center justify-start px-2 py-2 rounded-sm text-sm font-medium transition-colors duration-200  
                                ${
                                  isActive
                                    ? "border-x-2 border-primary bg-primary/20"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-2 w-4 h-4" />
                  {item.name}
                </NavLink>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Website group */}
          <Collapsible defaultOpen={isWebsiteOpen}>
            <CollapsibleTrigger
              onClick={() => setIsWebsiteOpen(!isWebsiteOpen)}
              className={`w-full flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200 
                    ${
                      isWebsitePath
                        ? "border-x-2 border-primary bg-primary/20"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }
                            `}
            >
              <div className="flex items-center text-sm px-2">
                <Globe className="mr-2 h-4 w-4" />
                Website
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isWebsiteOpen ? "-rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="py-2 space-y-2">
              {websiteItems.map((item, index) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "both",
                  }}
                  className={({ isActive }) =>
                    `animate-fade-in-up w-[90%] ml-5 flex items-center justify-start px-2 py-2 rounded-sm text-sm font-medium transition-colors duration-200  
                                ${
                                  isActive
                                    ? "border-x-2 border-primary bg-primary/20"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-2 w-4 h-4" />
                  {item.name}
                </NavLink>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Settings group */}
          <Collapsible defaultOpen={isSettingsPath}>
            <CollapsibleTrigger
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`w-full flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200 
                    ${
                      isSettingsPath
                        ? "border-x-2 border-primary bg-primary/20"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }
                            `}
            >
              <div className="flex items-center text-sm px-2">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isSettingsOpen ? "-rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="py-2 space-y-2">
              {settingsSubItems.map((item, index) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "both",
                  }}
                  className={({ isActive }) =>
                    `animate-fade-in-up w-[90%] ml-5 flex items-center justify-start px-2 py-2 rounded-sm text-sm font-medium transition-colors duration-200  
                                ${
                                  isActive
                                    ? "border-x-2 border-primary bg-primary/20"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-2 w-4 h-4" />
                  {item.name}
                </NavLink>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <Button variant="outline" className="justify-start w-full">
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
