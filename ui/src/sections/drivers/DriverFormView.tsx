import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import {
  DriverActiveStatusField,
  DriverEmailField,
  DriverFullNameField,
  DriverLicenseExpiryField,
  DriverLicenseNumberField,
  DriverOtpStatusField,
  DriverOwnerAssignmentField,
  DriverPhoneField
} from "../../components/forms/driver-fields";

type DriverFormViewProps = {
  mode: "create" | "edit";
};

export function DriverFormView({ mode }: DriverFormViewProps) {
  const navigate = useNavigate();
  const isCreate = mode === "create";

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4">Add / Edit Driver</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage driver profile details, licensing, and assignments.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" onClick={() => navigate("/drivers")}>
            Cancel
          </Button>
          <Button variant="contained" startIcon={<SaveIcon />}>
            {isCreate ? "Save Driver" : "Save Changes"}
          </Button>
        </Stack>
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={1.5}>
        <Stack spacing={2} sx={{ width: { xs: "100%", lg: 320 } }}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2">Driver Photo</Typography>
            <Box
              sx={{
                mt: 2,
                width: 160,
                height: 160,
                borderRadius: "50%",
                bgcolor: "#f3f4f6",
                mx: "auto"
              }}
            />
            <Button fullWidth sx={{ mt: 2 }} variant="outlined">
              Upload Photo
            </Button>
          </Paper>
          <DriverActiveStatusField />
          <DriverOtpStatusField />
        </Stack>

        <Stack spacing={2} sx={{ flex: 1 }}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Personal Information
            </Typography>
            <Stack spacing={2}>
              <DriverFullNameField />
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <DriverPhoneField />
                <DriverEmailField />
              </Stack>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Licensing & Assignment
            </Typography>
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <DriverLicenseNumberField />
                <DriverLicenseExpiryField />
              </Stack>
              <DriverOwnerAssignmentField />
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  );
}
