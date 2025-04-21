import { Navbar as HeroNavbar, NavbarContent, NavbarItem, Link } from "@heroui/react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <HeroNavbar>
      <NavbarContent>
        <NavbarItem isActive={pathname === "/table"}>
          <Link
            href="/table"
            color={pathname === "/table" ? "primary" : "foreground"}
          >
            Table
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/list"}>
          <Link
            href="/list"
            color={pathname === "/list" ? "primary" : "foreground"}
          >
            List
          </Link>
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
}
