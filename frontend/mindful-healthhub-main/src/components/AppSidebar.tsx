import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  User,
  Activity,
  Users,
  Heart,
  Shield,
} from 'lucide-react';

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;

  // Different menu items based on role
  const getMenuItems = () => {
    if (!user) return [];

    const baseItems = [
      { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
      { title: 'My Profile', url: '/profile', icon: User },
    ];

    if (user.role === 'admin') {
      return [
        { title: 'Admin Dashboard', url: '/dashboard', icon: Shield },
        { title: 'User Management', url: '/profile', icon: Users },
      ];
    }

    if (user.role === 'doctor') {
      return [
        { title: 'Provider Dashboard', url: '/dashboard', icon: Activity },
        { title: 'My Profile', url: '/profile', icon: User },
      ];
    }

    // Patient
    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-60'} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />

      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-health flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-sidebar-foreground">HealthCare</span>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{collapsed ? '...' : 'Navigation'}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
