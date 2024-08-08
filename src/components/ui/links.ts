import { HomeIcon, UsersRoundIcon, ClipboardMinusIcon } from "lucide-react";

const LinksItem = [
  {
    label: "Home",
    icon: HomeIcon,
    path: "/dashboard",
  },
  {
    label: "Users",
    icon: UsersRoundIcon,
    path: "/dashboard/users",
  },
  {
    label: "Presensi",
    icon: ClipboardMinusIcon,
    path: "/dashboard/presensi",
  },
];

export default LinksItem;
