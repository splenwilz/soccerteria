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
          href: "draws",
          label: "Draws",
          active: pathname.includes("/draw"),
          icon: LoaderPinwheelIcon,
          submenus: []
        },
        {
          href: "orders",
          label: "Orders",
          active: pathname.includes("/orders"),
          icon: Notebook,
          submenus: []
        },
        {
          href: "wallet",
          label: "Wallets",
          active: pathname.includes("/wallet"),
          icon: Wallet,
          submenus: []
        },
        {
          href: "communications",
          label: "Communications",
          active: pathname.includes("/communications"),
          icon: Megaphone,
          submenus: []
        },
        {
          href: "profile",
          label: "Profile",
          active: pathname.includes("/profile"),
          icon: SquareUser,
          submenus: []
        },
        {
          href: "combination",
          label: "Combination",
          active: pathname.includes("/combination"),
          icon: Box,
          submenus: []
        },
        {
          href: "support",
          label: "Support",
          active: pathname.includes("/support"),
          icon: Tag,
          submenus: []
        }

      ]
    }
  ];
}
