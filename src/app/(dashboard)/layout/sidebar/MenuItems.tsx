import {
  IconShoppingCart,
  IconLayoutDashboard,
  IconChefHat,
  IconBox,

} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "Pantry",
  },
  {
    id: uniqueId(),
    title: "Inventory",
    icon: IconBox,
    href: "/inventory",
  },
  {
    id: uniqueId(),
    title: "Peronal Chef",
    icon: IconChefHat,
    href: "/personalchef",
  },

  {
    id: uniqueId(),
    title: "Shopping Cart",
    icon: IconShoppingCart,
    href: "/shoppingcart",
  },


];

export default Menuitems;
