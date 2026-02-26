import {
  Box,
  Button,
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
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../components/status/status-badge";
import { ToolbarFilterField, ToolbarSearchField } from "../../components/filters/toolbar-fields";

const DRIVERS = [
  {
    id: "DRV-8921",
    name: "Sarah Chen",
    phone: "+1 (555) 987-6543",
    license: "DL-12345678",
    owner: "Speedy Delivery Inc.",
    verification: "Pending",
    status: "Offline"
  },
  {
    id: "DRV-2201",
    name: "Michael Ross",
    phone: "+1 (555) 456-7890",
    license: "DL-24681357",
    owner: "Logistics Prime LLC",
    verification: "Flagged",
    status: "Online"
  }
];

export function DriverListView() {
  const navigate = useNavigate();

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4">Drivers Management</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage verification, status, and fleet assignments.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/drivers/create")}>
            Add New Driver
          </Button>
        </Stack>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={1.5}>
          <ToolbarSearchField
            label="Search"
            placeholder="Search by driver name or phone number..."
            fullWidth
          />
          <ToolbarFilterField
            label="Owner"
            placeholder="All Fleets"
            options={[
              { value: "speedy", label: "Speedy Delivery Inc." },
              { value: "prime", label: "Logistics Prime LLC" }
            ]}
          />
          <ToolbarFilterField
            label="Verification"
            placeholder="All Statuses"
            options={[
              { value: "pending", label: "Pending" },
              { value: "flagged", label: "Flagged" },
              { value: "verified", label: "Verified" }
            ]}
          />
          <ToolbarFilterField
            label="Status"
            placeholder="All"
            options={[
              { value: "online", label: "Online" },
              { value: "offline", label: "Offline" }
            ]}
          />
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Driver Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>License Number</TableCell>
              <TableCell>Fleet Owner</TableCell>
              <TableCell>Verification</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DRIVERS.map((driver) => (
              <TableRow key={driver.id} hover>
                <TableCell>
                  <Typography fontWeight={600}>{driver.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    ID: {driver.id}
                  </Typography>
                </TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>{driver.license}</TableCell>
                <TableCell>{driver.owner}</TableCell>
                <TableCell>
                  <StatusBadge label={driver.verification} />
                </TableCell>
                <TableCell>
                  <StatusBadge label={driver.status} />
                </TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => navigate(`/drivers/${driver.id}/documents`)}>
                    View
                  </Button>
                  <Button size="small" onClick={() => navigate(`/drivers/${driver.id}/edit`)}>
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
