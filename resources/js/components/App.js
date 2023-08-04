import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Protected } from "./ProtectedRoute/ProtectedRoute";
import { SuperUserRoute } from "./ProtectedRoute/SuperUserRoute";

/** Frontend */
import HomePage from './Frontend/HomePage';
import RegisterAs from './Frontend/Auth/RegisterAs';
import UserRegistration from './Frontend/Auth/UserRegistration';
import OrganisationRegistration from './Frontend/Auth/OrganisationRegistration';
import Login from './Frontend/Auth/Login';
import AboutPage from './Frontend/Pages/AboutPage';
import AboutFEOPage from './Frontend/Pages/AboutFEO';
import MembersPage from './Frontend/Pages/Members';

import OrganizationList from './Frontend/Organisations/OrganisationList';
import OrganizationMap from './Frontend/Organisations/OrganizationMap';
// import OrganizationSingle from './Frontend/Organisations/OrganizationSingle';
import OrganizationProjects from './Frontend/Organisations/OrganizationProjects';
import OrganizationResources from './Frontend/Organisations/OrganizationResources';
import OrganizationDatasets from './Frontend/Organisations/OrganizationDatasets';
import OrganizationClassified from './Frontend/Organisations/OrganizationClassified';

import Projects from './Frontend/Projects/ProjectList';
import ProjectSingle from './Frontend/Projects/ProjectSingle';
import ProjectMap from './Frontend/Projects/ProjectMap';

import ElearningMaterials from './Frontend/Elearning/ElearningList';
import ElearningSingle from './Frontend/Elearning/ElearningSingle';

import DataHub from './Frontend/DataHub/DataHubList';
import DatahubSingle from './Frontend/DataHub/DatahubSingle';

import Whatson from './Frontend/Whatson/Whatson';
import WhatsonSingle from './Frontend/WhatsonSingle';

import Classified from './Frontend/Classified/ClassifiedList';
import ClassifiedSingle from './Frontend/Classified/ClassifiedSingle';

import TopicList from './Frontend/Topics/TopicsList';


/** Dashboard */
import Dashboard from "./Dashboard/Dashboard";

import ProfileSettings from './Dashboard/Settings/Profile';
import OrganizationContact from './Dashboard/Organization/Contact';
import StaffSettings from './Dashboard/Organization/Staff';
import OrganizationProfile from './Dashboard/Organization/Profile';
import AllMembers from './Dashboard/Members/MemberList';
import MemberRequest from './Dashboard/Members/MemberRequest';

import ProjectList from './Dashboard/Projects/ProjectList';
import AddNewProject from './Dashboard/Projects/AddNewProject';
import EditProject from './Dashboard/Projects/EditProject';

import ElearningList from './Dashboard/Elearning/ElearningList';
import AddNewElearning from './Dashboard/Elearning/AddNewElearning';
import EditElearning from './Dashboard/Elearning/EditElearning';

import DataHubList from './Dashboard/DataHub/DataHubList';
import AddDataHub from './Dashboard/DataHub/AddDataHub';
import EditDataHub from './Dashboard/DataHub/EditDataHub';

import WhatsonList from "./Dashboard/Whatson/WhatsonList";
import AddNewWhatson from "./Dashboard/Whatson/AddNewWhatson";
import EditWhatson from "./Dashboard/Whatson/EditWhatson";

import ClassifiedList from './Dashboard/Classifieds/ClassifiedList';
import AddNewClassified from './Dashboard/Classifieds/AddNewClassified';
import EditClassified from './Dashboard/Classifieds/EditClassified';

import MediaLibrary from './Dashboard/MediaLibrary/MediaLibrary';


/** SuperUser */
import SupDashboard from "./Superuser/Dashboard";
import SupUsers from "./Superuser/Users/Users";
import NewRequest from "./Superuser/Users/NewRequest";

import CMSPages from "./Superuser/Pages/Pages";
import EditHomePage from "./Superuser/Pages/UpdateHome";
import EditAboutPage from "./Superuser/Pages/UpdateAbout";

import MembersList from "./Superuser/Members/MembersList";
import AddNewMember from "./Superuser/Members/AddNewMember";
import EditMember from "./Superuser/Members/EditMember";

import Datatable from "./Superuser/Datatable";

/**
 * Kaveesh
 */
import ResourceExchange from "./Frontend/ResourceExchange/ResourceExchange";
import ResourceExchangeJobs from "./Frontend/ResourceExchange/ResourceExchangeJobs";
import JobProfile from "./Frontend/ResourceExchange/JobProfile";
import WhatsonEvents from "./Frontend/Whatson/WhatsonEvents";
import ResourceExchangeSuppliers from "./Frontend/ResourceExchange/ResourceExchangeSuppliers";
import ResourceExchangeGrantsAndProposals from "./Frontend/ResourceExchange/ResourceExchangeGrantsAndProposals";
import ResourceExchangeResourceSharing from "./Frontend/ResourceExchange/ResourceExchangeResourceSharing";
import SupplierProfile from "./Frontend/ResourceExchange/SupplierProfile";
import GrantsAndProposalsProfile from "./Frontend/ResourceExchange/GrantsAndProposalsProfile";
import ResourceSharingProfile from "./Frontend/ResourceExchange/ResourceSharingProfile";
import WhatsonVolunteerOpportunities from "./Frontend/Whatson/WhatsonVolunteerOpportunities";
import WhatsonMediaAndAdvocacy from "./Frontend/Whatson/WhatsonMediaAndAdvocacy";
import WhatsonEventProfile from "./Frontend/Whatson/WhatsonEventProfile";
import WhatsonVolunteerOpportunitiesProfile from "./Frontend/Whatson/WhatsonVolunteerOpportunitiesProfile";
import WhatsonMediaAndAdvocacyProfile from "./Frontend/Whatson/WhatsonMediaAndAdvocacyProfile";


import RegisterThankYou from './Frontend/Pages/RegisterThankYou';


/** Axios configuration  */
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

const theme = createTheme({
    typography: {
        fontFamily: "Manrope",
        fontWeightLight: 400,
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    {/* =================== General Routes =================== */}
                    <Route exact path={"/"} element={<HomePage />} />
                    <Route path={"/about"} element={<AboutPage />} />
                    <Route path={"/about-feo"} element={<AboutFEOPage />} />
                    <Route path={"/our-members"} element={<MembersPage />} />
                    <Route path={"/user-registration"} element={<UserRegistration />} />
                    <Route path={"/organisation-registration"} element={<OrganisationRegistration />} />

                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/register-as"} element={<RegisterAs />} />
                    {/* <Route path="/login" element={localStorage.getItem('auth_token') ? <Navigate to="/dashboard" /> : <Login />} />
                    <Route path="/register-as" element={localStorage.getItem('auth_token') ? <Navigate to="/dashboard" /> : <RegisterAs />} /> */}

                    <Route path={"/organizations"} element={<OrganizationList />} />
                    <Route path={"/organization-map"} element={<OrganizationMap />} />
                     {/*<Route path={"/:slug"} element={<OrganizationSingle />} /> */}
                    <Route path={"/organization/:slug"} element={<OrganizationProjects />} />
                    <Route path={"/:slug/resources"} element={<OrganizationResources />} />
                    <Route path={"/:slug/datasets"} element={<OrganizationDatasets />} />
                    <Route path={"/:slug/classified"} element={<OrganizationClassified />} />

                    <Route path={"/projects"} element={<Projects />} />
                    <Route path={"/project-map"} element={<ProjectMap />} />
                    <Route path={"/project/:slug"} element={<ProjectSingle />} />

                    <Route path={"/elearning-materials"} element={<ElearningMaterials />} />
                    <Route path={"elearning-material/:slug"} element={<ElearningSingle />} />

                    <Route path={"/datahub"} element={<DataHub />} />
                    <Route path={"datahub/:slug"} element={<DatahubSingle />} />

                    <Route path={"/whatson"} element={<Whatson />} />
                    <Route path={"/whatson/:slug"} element={<WhatsonSingle />} />
                    <Route path={"/whatson/events"} element={<WhatsonEvents />} />
                    <Route path={"/whatson/volunteer-opportunities"} element={<WhatsonVolunteerOpportunities />} />
                    <Route path={"/whatson/media-and-advocacy"} element={<WhatsonMediaAndAdvocacy />} />

                    <Route path={"/whatson-event/:slug"} element={<WhatsonEventProfile />} />
                    <Route path={"/whatson-volunteer-opportunity/:slug"} element={<WhatsonVolunteerOpportunitiesProfile />} />
                    <Route path={"/whatson-media-and-advocacy/:slug"} element={<WhatsonMediaAndAdvocacyProfile />} />

                    <Route path={"/classified"} element={<Classified />} />
                    <Route path={"classified/:slug"} element={<ClassifiedSingle />} />

                    <Route path={"topics"} element={<TopicList />} />

                    <Route path={"resource-exchange"} element={<ResourceExchange />} />
                    <Route path={"resource-exchange/jobs"} element={<ResourceExchangeJobs />} />
                    <Route path={"resource-exchange/suppliers"} element={<ResourceExchangeSuppliers />} />
                    <Route path={"resource-exchange/grants-and-proposals"} element={<ResourceExchangeGrantsAndProposals />} />
                    <Route path={"resource-exchange/resource-sharing"} element={<ResourceExchangeResourceSharing />} />

                    <Route path={"resource-exchange-job/:slug"} element={<JobProfile />} />
                    <Route path={"resource-exchange-supplier/:slug"} element={<SupplierProfile />} />
                    <Route path={"resource-exchange-proposal/:slug"} element={<GrantsAndProposalsProfile />} />
                    <Route path={"resource-exchange-resource-sharing/:slug"} element={<ResourceSharingProfile />} />

                    {/* =================== USER Routes =================== */}
                    <Route path={"/dashboard"} element={<Protected component={Dashboard} />} />

                    <Route path={"/profile"} element={<Protected component={OrganizationProfile} />} />
                    <Route path={"/profile-contact"} element={<Protected component={OrganizationContact} />} />
                    <Route path={"/profile-staff"} element={<Protected component={StaffSettings} />} />

                    <Route path={"/project-list"} element={<Protected component={ProjectList} />} />
                    <Route path={"/add-project"} element={<Protected component={AddNewProject} />} />
                    <Route path={"/edit-project/:slug"} element={<Protected component={EditProject} />} />

                    <Route path={"/elearning-list"} element={<Protected component={ElearningList} />} />
                    <Route path={"/add-elearning"} element={<Protected component={AddNewElearning} />} />
                    <Route path={"/edit-elearning/:slug"} element={<Protected component={EditElearning} />} />

                    <Route path={"/datahub-list"} element={<Protected component={DataHubList} />} />
                    <Route path={"/add-datahub"} element={<Protected component={AddDataHub} />} />
                    <Route path={"/edit-datahub/:slug"} element={<Protected component={EditDataHub} />} />

                    <Route path={"/whatson-list"} element={<Protected component={WhatsonList} />} />
                    <Route path={"/add-whatson"} element={<Protected component={AddNewWhatson} />} />
                    <Route path={"/edit-whatson/:slug"} element={<Protected component={EditWhatson} />} />

                    <Route path={"/classified-list"} element={<Protected component={ClassifiedList} />} />
                    <Route path={"/add-classified"} element={<Protected component={AddNewClassified} />} />
                    <Route path={"/edit-classified/:slug"} element={<Protected component={EditClassified} />} />

                    <Route path={"/media-library"} element={<Protected component={MediaLibrary} />} />

                    <Route path={"/all-members"} element={<Protected component={AllMembers} />} />
                    <Route path={"/member-request"} element={<Protected component={MemberRequest} />} />

                    <Route path={"/profile-settings"} element={<Protected component={ProfileSettings} />} />


                    {/* =================== SuperUser Routes =================== */}
                    <Route path={"/admin/dashboard"} element={<SuperUserRoute component={SupDashboard} />} />
                    <Route path={"/admin/users"} element={<SuperUserRoute component={SupUsers} />} />
                    <Route path={"/admin/new-request"} element={<SuperUserRoute component={NewRequest} />} />
                    <Route path={"/admin/pages"} element={<SuperUserRoute component={CMSPages} />} />
                    <Route path={"/edit-page/1"} element={<SuperUserRoute component={EditHomePage} />} />
                    <Route path={"/edit-page/2"} element={<SuperUserRoute component={EditAboutPage} />} />
                    <Route path={"/admin/members-list"} element={<SuperUserRoute component={MembersList} />} />
                    <Route path={"/admin/add-new-member"} element={<SuperUserRoute component={AddNewMember} />} />
                    <Route path={"/edit-member/:slug"} element={<SuperUserRoute component={EditMember} />} />
                    
                    {/* =================== ENC001 =================== */}

                    {/* General Routes */}
                    <Route exact path={"/thank-you"} element={<RegisterThankYou />} />
                    {/* Super admin routes */}
                    <Route path={"/en-admin/dashboard"} element={<Datatable />} />
                    {/* =================== ENC001 =================== */}
                    
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
