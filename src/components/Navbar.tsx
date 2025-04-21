import { Navbar as HeroNavbar, NavbarContent, NavbarItem, Link } from "@heroui/react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation()

  const isTable = pathname === "/" || pathname === "/table"
  const isList = pathname === "/list"

  return (
    <HeroNavbar>
      <NavbarContent>
        <NavbarItem isActive={isTable}>
          <Link
            href="/table"
            color={isTable ? "primary" : "foreground"}
          >
            Table
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isList}>
          <Link
            href="/list"
            color={isList ? "primary" : "foreground"}
          >
            List
          </Link>
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
}
