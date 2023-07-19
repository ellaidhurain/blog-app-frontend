import RssFeedIcon from '@mui/icons-material/RssFeed';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';



export const NavItems = [
  { label: "Feed", path: "/feed",  id: 0 ,icon:<RssFeedIcon/>},
  { label: "MySnaps", path: "/myblogs",  id: 1, icon:<PersonIcon/> },
  { label: "Profile", path: "/profile", id: 3, icon:<PeopleIcon/>},
  { label: "Settings", path: "/settings",  id: 2, icon:<SettingsIcon/>},
];
