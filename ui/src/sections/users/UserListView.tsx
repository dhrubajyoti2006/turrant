import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../components/status/status-badge";
import { ToolbarFilterField, ToolbarSearchField } from "../../components/filters/toolbar-fields";

const USERS = [
  {
    id: "USR-8832",
    name: "Sarah Jenkins",
    email: "s.jenkins@turrant.log",
    role: "Administrator",
    status: "Active",
    lastLogin: "2 mins ago"
  },
  {
    id: "USR-2291",
    name: "Alex Morgan",
    email: "a.morgan@turrant.log",
    role: "Support",
    status: "Inactive",
    lastLogin: "3 days ago"
  },
  {
    id: "USR-1044",
    name: "David Cole",
    email: "d.cole@turrant.log",
    role: "Manager",
    status: "Active",
    lastLogin: "14 mins ago"
  }
];

export function UserListView() {
  const navigate = useNavigate();

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4">Internal Platform Users</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage internal staff access, roles, and security permissions.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/users/create")}>
            Create User
          </Button>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Paper variant="outlined" sx={{ p: 2.5, minWidth: 180 }}>
          <Typography variant="caption" color="text.secondary">
            Total Users
          </Typography>
          <Typography variant="h4">1,248</Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2.5, minWidth: 180 }}>
          <Typography variant="caption" color="text.secondary">
            Active Now
          </Typography>
          <Typography variant="h4">42</Typography>
        </Paper>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={1.5}>
          <ToolbarSearchField
            label="Search"
            placeholder="Search users by name, email, or ID..."
            fullWidth
          />
          <ToolbarFilterField
            label="Role"
            placeholder="Role: All Roles"
            options={[
              { value: "admin", label: "Administrator" },
              { value: "manager", label: "Manager" },
              { value: "support", label: "Support" },
              { value: "viewer", label: "Viewer" }
            ]}
          />
          <ToolbarFilterField
            label="Status"
            placeholder="Status: All Status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "suspended", label: "Suspended" }
            ]}
          />
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {USERS.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Typography fontWeight={600}>{user.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    ID: {user.id}
                  </Typography>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <StatusBadge label={user.status} />
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => navigate(`/users/${user.id}/edit`)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
}
