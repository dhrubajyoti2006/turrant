import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../components/status/status-badge";
import { ToolbarFilterField, ToolbarSearchField } from "../../components/filters/toolbar-fields";

const FLEET_OWNERS = [
  { id: "FO-001", name: "GreenLine Logistics", city: "Pune", vehicles: 42, status: "Active" },
  { id: "FO-002", name: "TransMove Cargo", city: "Mumbai", vehicles: 27, status: "Active" },
  { id: "FO-003", name: "North Ridge Transport", city: "Bengaluru", vehicles: 15, status: "Review" }
];

export function FleetOwnerListView() {
  const navigate = useNavigate();

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4">Fleet Owners</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage fleet owner profiles and linked vehicle operations.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/fleet-owners/create")}>
          Create Fleet Owner
        </Button>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={1.5}>
          <ToolbarSearchField
            label="Search"
            placeholder="Search fleet owners by name or city..."
            fullWidth
          />
          <ToolbarFilterField
            label="City"
            placeholder="City: All"
            options={[
              { value: "pune", label: "Pune" },
              { value: "mumbai", label: "Mumbai" },
              { value: "bengaluru", label: "Bengaluru" }
            ]}
          />
          <ToolbarFilterField
            label="Status"
            placeholder="Status: All"
            options={[
              { value: "active", label: "Active" },
              { value: "review", label: "Review" }
            ]}
          />
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Owner ID</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Vehicles</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {FLEET_OWNERS.map((owner) => (
              <TableRow key={owner.id} hover>
                <TableCell>{owner.name}</TableCell>
                <TableCell>{owner.id}</TableCell>
                <TableCell>{owner.city}</TableCell>
                <TableCell>{owner.vehicles}</TableCell>
                <TableCell>
                  <StatusBadge label={owner.status} />
                </TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => navigate(`/fleet-owners/${owner.id}`)}>
                    View
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
