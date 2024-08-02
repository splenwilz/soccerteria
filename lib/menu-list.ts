import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LoaderPinwheelIcon,
  Notebook,
  Wallet,
  Megaphone,
  SquareUser,
  Box
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Home",
          active: pathname.split("/").pop() === "dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/dashboard/draws",
          label: "Draws",
          active: pathname.includes("/draw"),
          icon: LoaderPinwheelIcon,
          submenus: []
        },
        {
          href: "/dashboard/orders",
          label: "Orders",
          active: pathname.includes("/orders"),
          icon: Notebook,
          submenus: []
        },
        {
          href: "/dashboard/wallet",
          label: "Wallets",
          active: pathname.includes("/wallet"),
          icon: Wallet,
          submenus: []
        },
        {
          href: "/dashboard/communications",
          label: "Communications",
          active: pathname.includes("/communications"),
          icon: Megaphone,
          submenus: []
        },
        {
          href: "/dashboard/profile",
          label: "Profile",
          active: pathname.includes("/profile"),
          icon: SquareUser,
          submenus: []
        },
        {
          href: "/dashboard/combination",
          label: "Combination",
          active: pathname.includes("/combination"),
          icon: Box,
          submenus: []
        },
        {
          href: "/dashboard/support",
          label: "Support",
          active: pathname.includes("/support"),
          icon: Tag,
          submenus: []
        }

      ]
    }
  ];
}

export function getAdminMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin",
          label: "Home",
          active: pathname.split("/").pop() === "admin",
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: "/admin/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/admin/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: []
        },
        {
          href: "/admin/matchlist",
          label: "Match List",
          active: pathname.includes("/matchlist"),
          icon: Bookmark,
          submenus: []
        },
        {
          href: "/admin/communications",
          label: "Communications",
          active: pathname.includes("/communications"),
          icon: Megaphone,
          submenus: []
        },
        {
          href: "/admin/support",
          label: "Support",
          active: pathname.includes("/support"),
          icon: Tag,
          submenus: []
        },
        {
          href: "/admin/combination",
          label: "Combination",
          active: pathname.includes("/combination"),
          icon: Box,
          submenus: []
        },
        {
          href: "/admin/wallet",
          label: "Wallet",
          active: pathname.includes("/wallet"),
          icon: Wallet,
          submenus: []
        },
        {
          href: "/admin/orders",
          label: "Orders",
          active: pathname.includes("/orders"),
          icon: Notebook,
          submenus: []
        },
        {
          href: "/admin/draws",
          label: "Draws",
          active: pathname.includes("/draw"),
          icon: LoaderPinwheelIcon,
          submenus: []
        }
      ]
    }
  ];
}
