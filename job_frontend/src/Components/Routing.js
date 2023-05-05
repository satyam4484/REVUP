import React, { lazy, Suspense } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Spinner from "./UI/Spinner";
const Signup = lazy(() => import("./Forms/Signup"));
const Login = lazy(() => import("./Forms/Login"));
const Recovery = lazy(() => import("./Forms/Recovery/Recovery"));
const Profile = lazy(() => import("../Components/Profiles/Profile"));
const Company = lazy(() => import("./Organizations/Company"));
const Jobs = lazy(() => import("./Jobs/Jobs"));
const JobsDetails = lazy(() => import("./Jobs/JobDetails"));
const CompanyJobDetails = lazy(() => import("./Organizations/Jobs/JobDetails"))
const JobPreference = lazy(() => import("../Components/Profiles/JobPreference/Preferene"))
const OrganizationJob = lazy(()=>import("./Jobs/OrganizationJob"))
const Landing = lazy(()=>import("./Landing/Landing"));

const Routing = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/auth" element={<Outlet />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<Recovery/>} />
        </Route>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobsDetails />} />
        <Route path="/jobs/organization=:org" element={<OrganizationJob />} />
        <Route path="/profile" element={<Outlet />} >
          <Route path=":user" element={<Profile/>}/>
          <Route path=":user/jobPrefernce" element={<JobPreference/>}/>
        </Route>
        {/* <Route path="/profile/:user" element={<Profile />} /> */}
        <Route path="/company" element={<Outlet />}>
          <Route path=":user" element={<Company />} />
          <Route path=":user/jobsposted/:slug" element={<CompanyJobDetails />} />
        </Route>
        <Route path="/" element={<Landing/>}/>
      </Routes>
    </Suspense>
  );
};

export default Routing;
