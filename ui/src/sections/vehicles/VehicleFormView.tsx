import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import {
  FleetOwnerAssignmentField,
  FuelTypeField,
  SeatingCapacityField,
  VehicleColorField,
  VehicleMakeField,
  VehicleModelField,
  VehicleRegistrationField,
  VehicleVerificationStatusField,
  VehicleVinField,
  VehicleYearField
} from "../../components/forms/vehicle-fields";

type VehicleFormViewProps = {
  mode: "create" | "edit";
};

export function VehicleFormView({ mode }: VehicleFormViewProps) {
  const navigate = useNavigate();
  const isCreate = mode === "create";

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h4">{isCreate ? "Add New Vehicle" : "Edit Vehicle"}</Typography>
        <Typography variant="body2" color="text.secondary">
          {isCreate
            ? "Enter vehicle details below to register a new unit."
            : "Update vehicle identity, specifications, and assignment details."}
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          <Typography variant="h6">Vehicle Identity</Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <VehicleRegistrationField />
            <VehicleVinField />
          </Stack>

          <Typography variant="h6" sx={{ pt: 1 }}>
            Specifications
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <VehicleMakeField />
            <VehicleModelField />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <VehicleYearField />
            <VehicleColorField />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <SeatingCapacityField />
            <FuelTypeField />
          </Stack>

          <Typography variant="h6" sx={{ pt: 1 }}>
            Administration
          </Typography>
          <FleetOwnerAssignmentField />
          <VehicleVerificationStatusField />

          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
            <Button variant="outlined" onClick={() => navigate("/vehicles")}>
              Cancel
            </Button>
            <Button variant="contained" startIcon={<SaveIcon />}>
              {isCreate ? "Save Vehicle" : "Update Vehicle"}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
