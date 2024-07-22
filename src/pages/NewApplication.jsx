import { React, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApplicationForm } from "../components/index";
import PastApplications from "../components/student/PastApplications";
import FundsReceived from "../components/student/FundsReceived";

function NewApplication() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route element={<ApplicationForm />} path="/applicationForm" />
    //     <Route element={<PastApplications />} path="/pastApplications" />
    //     <Route element={<FundsReceived />} path="/fundsReceived" />
    //   </Routes>

    // </BrowserRouter>
       <ApplicationForm /> 
  );
}

export default NewApplication;
