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
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../components/status/status-badge";
import {
  ToolbarFilterField,
  ToolbarIconActionButton,
  ToolbarSearchField
} from "../../components/filters/toolbar-fields";

const VEHICLES = [
  {
    id: "TR-2023-X99",
    type: "SUV",
    model: "Toyota Fortuner",
    year: "2022",
    owner: "Logistics Corp",
    driver: "John Doe",
    verification: "Verified",
    status: "Active"
  },
  {
    id: "TR-2021-A45",
    type: "Truck",
    model: "Volvo FH16",
    year: "2021",
    owner: "Global Freight",
    driver: "Mike Smith",
    verification: "Pending",
    status: "Out of Service"
  }
];

export function VehicleListView() {
  const navigate = useNavigate();

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4">Vehicles</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage, verify, and track your vehicle registry.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/vehicles/create")}>
          Add Vehicle
        </Button>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
          <ToolbarSearchField
            label="Search"
            placeholder="Search by Registration Number..."
            fullWidth
          />
          <ToolbarFilterField
            label="Fleet Owner"
            placeholder="All Owners"
            options={[
              { value: "logistics-corp", label: "Logistics Corp" },
              { value: "global-freight", label: "Global Freight" }
            ]}
          />
          <ToolbarFilterField
            label="Status"
            placeholder="All Statuses"
            options={[
              { value: "active", label: "Active" },
              { value: "out-of-service", label: "Out of Service" },
              { value: "maintenance", label: "Maintenance" }
            ]}
          />
          <ToolbarFilterField
            label="Type"
            placeholder="All Types"
            options={[
              { value: "sedan", label: "Sedan" },
              { value: "suv", label: "SUV" },
              { value: "truck", label: "Truck" },
              { value: "van", label: "Van" }
            ]}
          />
          <Stack direction="row" spacing={1} alignItems="flex-end">
            <ToolbarIconActionButton title="Refresh Data" icon={<RefreshIcon fontSize="small" />} />
            <ToolbarIconActionButton title="Export" icon={<DownloadIcon fontSize="small" />} />
          </Stack>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Registration No</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Model / Year</TableCell>
              <TableCell>Fleet Owner</TableCell>
              <TableCell>Current Driver</TableCell>
              <TableCell align="center">Verification</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {VEHICLES.map((vehicle) => (
              <TableRow key={vehicle.id} hover>
                <TableCell>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => navigate(`/vehicles/${vehicle.id}/compliance`)}
                  >
                    {vehicle.id}
                  </Button>
                </TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>
                  {vehicle.model} ({vehicle.year})
                </TableCell>
                <TableCell>{vehicle.owner}</TableCell>
                <TableCell>{vehicle.driver}</TableCell>
                <TableCell align="center">
                  <StatusBadge label={vehicle.verification} />
                </TableCell>
                <TableCell align="center">
                  <StatusBadge label={vehicle.status} />
                </TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}>
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
