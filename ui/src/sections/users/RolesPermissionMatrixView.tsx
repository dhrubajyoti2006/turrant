import {
  Box,
  Button,
  Checkbox,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

const ROLES = ["Super Admin", "Back Office Admin", "Support L1", "Fleet Manager", "Finance Lead"];

const MODULES = [
  { name: "Fleet Owners", read: true, create: true, update: true, delete: false, approve: true },
  { name: "Rides & Bookings", read: true, create: false, update: true, delete: false, approve: false },
  { name: "Vehicles Inventory", read: true, create: true, update: true, delete: true, approve: true },
  { name: "Payouts & Settlements", read: true, create: false, update: false, delete: false, approve: true }
];

export function RolesPermissionMatrixView() {
  const navigate = useNavigate();

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4">Roles & Permissions</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage role-based access control across platform modules.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/configurations/roles-permissions/create")}
        >
          Create New Role
        </Button>
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2} alignItems="stretch">
        <Paper variant="outlined" sx={{ width: { xs: "100%", lg: 320 }, p: 1 }}>
          <List disablePadding>
            {ROLES.map((role, idx) => (
              <ListItemButton key={role} selected={idx === 0}>
                <ListItemText primary={role} secondary={idx === 0 ? "System Wide" : "Role profile"} />
                {idx === 0 ? <ChevronRightIcon fontSize="small" /> : null}
              </ListItemButton>
            ))}
          </List>
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1, overflow: "hidden" }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Super Admin Permissions</Typography>
            <Typography variant="body2" color="text.secondary">
              Configure detailed access controls for this role.
            </Typography>
          </Box>
          <Divider />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Module / Resource</TableCell>
                <TableCell align="center">Read</TableCell>
                <TableCell align="center">Create</TableCell>
                <TableCell align="center">Update</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">Approve</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MODULES.map((module) => (
                <TableRow key={module.name} hover>
                  <TableCell>{module.name}</TableCell>
                  <TableCell align="center">
                    <Checkbox checked={module.read} size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox checked={module.create} size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox checked={module.update} size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox checked={module.delete} size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox checked={module.approve} size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Stack>
    </Stack>
  );
}
