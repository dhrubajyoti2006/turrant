# Turrant Table Classification

This document separates the database into:

- Master tables
- Assignment / transaction tables

It is intended as the design reference before adding more SQL migrations.

## Master Tables

| Table Name | Purpose | Primary Relationships | Notes |
|---|---|---|---|
| `admin_roles` | Defines internal platform roles and permission groups | Referenced by `users`, `user_role_assignments`, `user_role_assignment_logs` | Core RBAC master |
| `users` | Internal platform users (admin, support, ops, compliance) | References `admin_roles`; referenced by most audit/assignment tables | Back-office users only |
| `fleet_owners` | Master record for fleet partners/companies | Referenced by `vehicles`, `drivers`, fleet-related assignments | Parent business entity |
| `vehicles` | Master vehicle registry | References `fleet_owners`; referenced by `drivers`, vehicle assignments | Vehicle can exist before assignment |
| `drivers` | Master driver registry | References `fleet_owners`, optionally `vehicles`; referenced by driver assignments | Driver profile/compliance root |
| `driver_licenses` | Driver license master data | References `drivers` | Best kept separate because licenses change/renew |
| `driver_documents` | Driver document master/compliance files | References `drivers` | KYC/compliance metadata |
| `fleet_owner_documents` | Fleet owner document master/compliance files | References `fleet_owners` | Registration, tax, banking docs |
| `vehicle_documents` | Vehicle compliance documents | References `vehicles` | RC, insurance, permit, PUC |
| `service_areas` | Supported operational cities/regions | Referenced by fleets, vehicles, reporting, assignments | Good for scaling ops rules |
| `platform_configs` | Global platform settings/configs | Usually audited by `users` | Could store feature toggles / rules |
| `verification_rules` | Master checklist/rule definitions | Referenced by verification workflows | Useful for Verification Center |
| `support_case_types` | Master list of support/investigation categories | Referenced by support cases | E.g. dispute, fraud, lost item |
| `vehicle_categories` | Vehicle type/category master | Referenced by `vehicles` | Optional if you want lookup table instead of enum |
| `user_types` | User classification master | Referenced by `users` | Optional if using table; currently this is an enum in schema |

## Assignment / Transaction Tables

| Table Name | Purpose | Primary Relationships | Notes |
|---|---|---|---|
| `user_role_assignments` | Assigns one or more roles to users | References `users`, `admin_roles` | Needed if multi-role support is required |
| `user_role_assignment_logs` | Tracks role changes for users | References `users`, `admin_roles` | Best immediate fit for the current UI |
| `driver_assignments` | History of assigning drivers to fleets/vehicles | References `drivers`, `fleet_owners`, `vehicles`, `users` | Tracks active, scheduled, ended |
| `vehicle_assignments` | History of assigning vehicles to fleets/drivers | References `vehicles`, `fleet_owners`, `drivers`, `users` | Useful if independent vehicle assignment history is needed |
| `verification_assignments` | Assigns verification work items to internal users | References `users`; points to `drivers` / `vehicles` / `fleet_owners` via entity fields | Maps to Verification Center |
| `support_case_assignments` | Assigns support/investigation cases to internal users | References `users`, `support_cases` | For support workflow ownership |
| `support_cases` | Operational support/investigation tickets | References `support_case_types`, and optionally `drivers`, `vehicles`, `fleet_owners`, `users` | Core support domain transaction |
| `support_case_comments` | Conversation/comments on support cases | References `support_cases`, `users` | Audit trail and collaboration |
| `driver_verifications` | Verification workflow records for drivers | References `drivers`, `users` | Background check, ID match, etc. |
| `vehicle_verifications` | Verification workflow records for vehicles | References `vehicles`, `users` | Compliance review workflow |
| `fleet_owner_verifications` | Verification workflow records for fleet owners | References `fleet_owners`, `users` | Ownership/legal verification |
| `driver_status_logs` | Tracks driver status changes | References `drivers`, `users` | Operational history |
| `vehicle_status_logs` | Tracks vehicle status changes | References `vehicles`, `users` | Active, maintenance, suspended |
| `fleet_owner_status_logs` | Tracks fleet owner status changes | References `fleet_owners`, `users` | Pending, verified, rejected |
| `user_activity_logs` | Audit log for internal user changes | References `users` | Profile/status/security changes |
| `driver_activity_logs` | Audit log for driver changes | References `drivers`, `users` | Profile/document/assignment changes |
| `vehicle_activity_logs` | Audit log for vehicle changes | References `vehicles`, `users` | Compliance/assignment changes |
| `fleet_owner_activity_logs` | Audit log for fleet owner changes | References `fleet_owners`, `users` | Profile/verification changes |

## Recommended Practical MVP

| Phase | Tables |
|---|---|
| Master phase | `admin_roles`, `users`, `fleet_owners`, `vehicles`, `drivers` |
| Next master/compliance | `driver_licenses`, `driver_documents`, `vehicle_documents`, `fleet_owner_documents` |
| First assignment phase | `user_role_assignment_logs`, `driver_assignments`, `verification_assignments` |
| Next workflow phase | `support_cases`, `support_case_assignments`, `support_case_comments` |
| Full audit phase | `user_activity_logs`, `driver_activity_logs`, `vehicle_activity_logs`, `fleet_owner_activity_logs` |

## Recommended Next Tables

Given the current product screens and schema, the next most useful tables are:

1. `user_role_assignment_logs`
2. `driver_assignments`
3. `verification_assignments`

These align directly with:

- user role change log
- fleet owner vehicle/driver management
- verification center workflow
