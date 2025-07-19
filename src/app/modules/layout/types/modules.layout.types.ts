export type SidebarItem = SideBarItemFlat | SideBarItemGroup;

interface SideBarItemFlat {
  type: 'Flat';
  label: string;
  icon: string;
  route: string;
}

interface SideBarItemGroup {
  type: 'Menu';
  label: string;
  icon: string;
  menu: SidebarItem;
}
