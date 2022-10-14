import { AdminEvent } from "./pages/Admin/AdminEvent/AdminEvent";
import { Main } from "./pages/Main/Main";
import { Event } from "./pages/Event/Event";
import { Registration } from "./pages/Registration/Registration";
import { RegistrationTm } from "./pages/RegistrationTm/RegistrationTm";
import {
  ADMIN_EVENT_ROUTER,
  ADMIN_MATERIAL_NEW_ROUTER,
  ADMIN_MATERIAL_ROUTER,
  ADMIN_ORGANIZER_ROUTER,
  ADMIN_PARTICIPANT_ROUTER,
  ADMIN_ROUTER,
  ADMIN_SPONSOR_NEW_ROUTER,
  ADMIN_SPONSOR_ROUTER,
  ADMIN_TEAM_ROUTER,
  EVENT_ROUTER,
  MAIN_ROUTER,
  REGISTRATIONTM_ROUTER,
  REGISTRATION_ROUTER,
  ADMIN_ORGANIZER_NEW_ROUTER,
  ADMIN_PARTICIPANT_NEW_ROUTER,
  ADMIN_TEAM_NEW_ROUTER,
  ADMIN_EVENT_NEW_ROUTER,
} from "./utils/consts";
import { AdminMaterialNew } from "./pages/Admin/AdminMaterialNew/AdminMaterialNew";
import { AdminSponsorNew } from "./pages/Admin/AdminSponsorNew/AdminSponsorNew";
import { AdminOrganizerNew } from "./pages/Admin/AdminOrganizerNew/AdminOrganizerNew";
import { AdminParticipantNew } from "./pages/Admin/AdminParticipantNew/AdminParticipantNew";
import { AdminTeamNew } from "./pages/Admin/AdminTeamNew/AdminTeamNew";
import { AdminEventNew } from "./pages/Admin/AdminEventNew/AdminEventNew";
import { AdminMaterialOne } from "./pages/Admin/AdminMaterialOne/AdminMaterialOne";
import { AdminParticipantOne } from "./pages/Admin/AdminParticipantOne/AdminParticipantOne";
import { AdminTeamOne } from "./pages/Admin/AdminTeamOne/AdminTeamOne";
import { AdminOrganizerOne } from "./pages/Admin/AdminOrganizerOne/AdminOrganizerOne";
import { AdminSponsorOne } from "./pages/Admin/AdminSponsorOne/AdminSponsorOne";
import { AdminEventOne } from "./pages/Admin/AdminEventOne/AdminEventOne";
import { AdminTeam } from "./pages/Admin/AdminTeam/AdminTeam";
import { AdminParticipant } from "./pages/Admin/AdminParticipant/AdminParticipant";
import { AdminMaterial } from "./pages/Admin/AdminMaterial/AdminMaterial";
import { AdminOrganizer } from "./pages/Admin/AdminOrganizer/AdminOrganizer";
import { AdminSponsor } from "./pages/Admin/AdminSponsor/AdminSponsor";
import { AdminLogin } from "./pages/Admin/AdminLogin/AdminLogin";

export const publicRoutes = [
  {
    path: EVENT_ROUTER + "/:id",
    Component: <Event />,
  },
  {
    path: MAIN_ROUTER,
    Component: <Main />,
  },
  {
    path: REGISTRATION_ROUTER + "/:id",
    Component: <Registration />,
  },
  {
    path: REGISTRATIONTM_ROUTER + "/:id",
    Component: <RegistrationTm />,
  },
  {
    path: ADMIN_ROUTER,
    Component: <AdminLogin />,
  },
];
export const authRoutes = [
  {
    path: ADMIN_EVENT_ROUTER,
    Component: <AdminEvent />,
  },
  {
    path: ADMIN_EVENT_ROUTER + "/:id",
    Component: <AdminEventOne />,
  },
  {
    path: ADMIN_MATERIAL_ROUTER,
    Component: <AdminMaterial />,
  },
  {
    path: ADMIN_MATERIAL_ROUTER + "/:id",
    Component: <AdminMaterialOne />,
  },
  {
    path: ADMIN_TEAM_ROUTER,
    Component: <AdminTeam />,
  },
  {
    path: ADMIN_TEAM_ROUTER + "/:id",
    Component: <AdminTeamOne />,
  },
  {
    path: ADMIN_PARTICIPANT_ROUTER,
    Component: <AdminParticipant />,
  },
  {
    path: ADMIN_PARTICIPANT_ROUTER + "/:id",
    Component: <AdminParticipantOne />,
  },
  {
    path: ADMIN_ORGANIZER_ROUTER,
    Component: <AdminOrganizer />,
  },
  {
    path: ADMIN_ORGANIZER_ROUTER + "/:id",
    Component: <AdminOrganizerOne />,
  },
  {
    path: ADMIN_SPONSOR_ROUTER,
    Component: <AdminSponsor />,
  },
  {
    path: ADMIN_SPONSOR_ROUTER + "/:id",
    Component: <AdminSponsorOne />,
  },
  { path: ADMIN_MATERIAL_NEW_ROUTER, Component: <AdminMaterialNew /> },
  { path: ADMIN_SPONSOR_NEW_ROUTER, Component: <AdminSponsorNew /> },
  { path: ADMIN_ORGANIZER_NEW_ROUTER, Component: <AdminOrganizerNew /> },
  { path: ADMIN_TEAM_NEW_ROUTER, Component: <AdminTeamNew /> },
  { path: ADMIN_PARTICIPANT_NEW_ROUTER, Component: <AdminParticipantNew /> },
  { path: ADMIN_EVENT_NEW_ROUTER, Component: <AdminEventNew /> },
];
