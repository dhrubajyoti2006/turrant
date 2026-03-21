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
  TextField,
  Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
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

const ROLE_ASSIGNMENT_LOGS = [
  {
    timestamp: "2023-10-24 14:20:55",
    admin: "Admin Sarah",
    action: "Role Updated",
    field: "Assigned Roles",
    oldValue: "Back Office",
    newValue: "Admin, Back Office",
    ipDevice: "192.168.1.45 / Chrome (Mac)"
  },
  {
    timestamp: "2023-10-20 11:30:04",
    admin: "Admin Mike",
    action: "Status Changed",
    field: "Account Status",
    oldValue: "PENDING",
    newValue: "ACTIVE",
    ipDevice: "10.0.0.12 / Firefox (Win)"
  }
];

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

      {!isCreate ? (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1.25}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search audit logs..."
              />
              <Button variant="outlined">Date Range</Button>
              <Button variant="outlined" sx={{ minWidth: 44, px: 1.25 }}>
                <DownloadRoundedIcon fontSize="small" />
              </Button>
            </Stack>

            <Paper variant="outlined" sx={{ overflow: "hidden" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>TIMESTAMP</TableCell>
                    <TableCell>ADMIN</TableCell>
                    <TableCell>ACTION</TableCell>
                    <TableCell>FIELD</TableCell>
                    <TableCell>OLD VALUE</TableCell>
                    <TableCell>NEW VALUE</TableCell>
                    <TableCell>IP/DEVICE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ROLE_ASSIGNMENT_LOGS.map((log) => (
                    <TableRow key={`${log.timestamp}-${log.admin}`} hover>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.admin}</TableCell>
                      <TableCell>
                        <Typography
                          component="span"
                          sx={{
                            px: 1,
                            py: 0.375,
                            borderRadius: 999,
                            fontSize: 12,
                            fontWeight: 700,
                            bgcolor: log.action === "Role Updated" ? "rgba(59,130,246,0.12)" : "rgba(34,197,94,0.12)",
                            color: log.action === "Role Updated" ? "#2563eb" : "#15803d"
                          }}
                        >
                          {log.action}
                        </Typography>
                      </TableCell>
                      <TableCell>{log.field}</TableCell>
                      <TableCell sx={{ color: "text.secondary" }}>{log.oldValue}</TableCell>
                      <TableCell sx={{ color: "#15803d", fontWeight: 700 }}>{log.newValue}</TableCell>
                      <TableCell sx={{ color: "text.secondary" }}>{log.ipDevice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ px: 2, py: 1.25, borderTop: "1px solid rgba(15, 23, 42, 0.08)" }}
              >
                <Typography variant="body2" color="text.secondary">
                  Showing 1 to 2 of 24 logs
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button size="small" variant="outlined">
                    Previous
                  </Button>
                  <Button size="small" variant="contained">
                    Next
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Paper>
      ) : null}
    </Stack>
  );
}
