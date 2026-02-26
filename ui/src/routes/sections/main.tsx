import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { MainLayout } from "../../layouts/main";
import DashboardPage from "../../pages/dashboard";
import UsersListPage from "../../pages/users";
import UserCreatePage from "../../pages/users/create";
import UserEditPage from "../../pages/users/edit";
import ConfigRolesPermissionsPage from "../../pages/configurations/roles-permissions";
import ConfigRoleProfilePage from "../../pages/configurations/role-profile";
import ConfigPlatformPage from "../../pages/configurations/platform-config";
import FleetOwnersPage from "../../pages/fleet-owners";
import FleetOwnerCreatePage from "../../pages/fleet-owners/create";
import FleetOwnerEditPage from "../../pages/fleet-owners/edit";
import FleetOwnerDetailPage from "../../pages/fleet-owners/detail";
import VehiclesPage from "../../pages/vehicles";
import VehicleCreatePage from "../../pages/vehicles/create";
import VehicleEditPage from "../../pages/vehicles/edit";
import VehicleCompliancePage from "../../pages/vehicles/compliance";
import DriversPage from "../../pages/drivers";
import DriverCreatePage from "../../pages/drivers/create";
import DriverEditPage from "../../pages/drivers/edit";
import DriverDocumentsPage from "../../pages/drivers/documents";
import SupportInvestigationPage from "../../pages/support";
import VefificationCenterPage from "../../pages/assignments/vefification-center";
import ReportingAnalyticsPage from "../../pages/reporting";

function NewScreen() {
  return <Typography variant="h4">New Screen</Typography>;
}

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        path: "home",
        element: <DashboardPage />
      },
      {
        path: "dashboard",
        element: <DashboardPage />
      },
      {
        path: "new",
        element: <NewScreen />
      },
      {
        path: "users",
        element: <UsersListPage />
      },
      {
        path: "users/create",
        element: <UserCreatePage />
      },
      {
        path: "users/:id/edit",
        element: <UserEditPage />
      },
      {
        path: "fleet-owners",
        element: <FleetOwnersPage />
      },
      {
        path: "fleet-owners/create",
        element: <FleetOwnerCreatePage />
      },
      {
        path: "fleet-owners/:id",
        element: <FleetOwnerDetailPage />
      },
      {
        path: "fleet-owners/:id/edit",
        element: <FleetOwnerEditPage />
      },
      {
        path: "vehicles",
        element: <VehiclesPage />
      },
      {
        path: "vehicles/create",
        element: <VehicleCreatePage />
      },
      {
        path: "vehicles/:id/edit",
        element: <VehicleEditPage />
      },
      {
        path: "vehicles/:id/compliance",
        element: <VehicleCompliancePage />
      },
      {
        path: "drivers",
        element: <DriversPage />
      },
      {
        path: "drivers/create",
        element: <DriverCreatePage />
      },
      {
        path: "drivers/:id/edit",
        element: <DriverEditPage />
      },
      {
        path: "drivers/:id/documents",
        element: <DriverDocumentsPage />
      },
      {
        path: "support",
        element: <SupportInvestigationPage />
      },
      {
        path: "reporting-analysis",
        element: <ReportingAnalyticsPage />
      },
      {
        path: "assignments/vefification-center",
        element: <VefificationCenterPage />
      },
      {
        path: "assignments/verification-center",
        element: <VefificationCenterPage />
      },
      {
        path: "configurations/roles-permissions",
        element: <ConfigRolesPermissionsPage />
      },
      {
        path: "configurations/roles-permissions/create",
        element: <ConfigRoleProfilePage />
      },
      {
        path: "configurations/roles-permissions/:id/edit",
        element: <ConfigRoleProfilePage />
      },
      {
        path: "configurations/platform-config",
        element: <ConfigPlatformPage />
      }
    ]
  },
];
