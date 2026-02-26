import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import {
  ActiveStatusField,
  EmailField,
  FullNameField,
  PhoneField,
  RoleAssignmentField
} from "../../components/forms/user-fields";

type UserFormViewProps = {
  mode: "create" | "edit";
};

export function UserFormView({ mode }: UserFormViewProps) {
  const navigate = useNavigate();
  const isCreate = mode === "create";

  return (
    <Stack spacing={2}>
      <Button
        startIcon={<ArrowBackIcon />}
        sx={{ alignSelf: "flex-start" }}
        onClick={() => navigate("/users")}
      >
        Back to Users
      </Button>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h5">{isCreate ? "Create Portal User" : "Edit Portal User"}</Typography>
            <Typography variant="body2" color="text.secondary">
              {isCreate
                ? "Create a new portal user account."
                : "Update user details, role assignment, and account status."}
            </Typography>
          </Box>

          <FullNameField />
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <EmailField />
            <PhoneField />
          </Stack>
          <RoleAssignmentField />
          <ActiveStatusField />

          <Stack direction="row" spacing={1.5} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => navigate("/users")}>
              Cancel
            </Button>
            <Button variant="outlined">Save Draft</Button>
            <Button variant="contained" startIcon={<SendIcon />}>
              {isCreate ? "Save & Invite" : "Save Changes"}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
