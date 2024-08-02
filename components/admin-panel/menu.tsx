"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import { getAdminMenuList, getMenuList } from "@/lib/menu-list";
import { SignOutButton } from "@clerk/nextjs";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = pathname.includes("/admin") ? getAdminMenuList(pathname) : getMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-68px-36px-16px-32px)] lg:min-h-[calc(100vh-62px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-0" : "")} key={index}>
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                (
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={active ? "secondary" : "ghost"}
                            className="w-full justify-start h-10 mb-1"
                            asChild
                          >
                            <Link href={href}>
                              <span
                                className={cn(isOpen === false ? " text-white" : "mr-4 text-white")}
                              >
                                <Icon size={18} />
                              </span>
                              <p
                                className={cn(
                                  "max-w-[200px] truncate text-white",
                                  isOpen === false
                                    ? "-translate-x-96 opacity-0 "
                                    : "translate-x-0 opacity-100 "
                                )}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isOpen === false && (
                          <TooltipContent side="right">
                            {label}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <>
                    <div
                      onClick={() => {
                        // call the onClick method of the child component
                        const signOutButton = document.querySelector<HTMLButtonElement>('button[data-testid="sign-out-button"]');
                        if (signOutButton) {
                          signOutButton.click();
                        }
                      }}
                      // variant="outline"
                      className="flex bg-white rounded-md w-full justify-center h-10 mt-5 hover:bg-[#344054] hover:text-white hover:border-0"
                    >
                      <span className={cn(isOpen === false ? "mt-2" : "mr-4 mt-2")}>
                        <LogOut size={18} />
                      </span>
                      <SignOutButton data-testid="sign-out-button" />
                    </div>
                  </>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
