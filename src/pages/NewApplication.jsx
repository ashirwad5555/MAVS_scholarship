import { React, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApplicationForm } from "../components/index";
import PastApplications from "../components/student/PastApplications";
import FundsReceived from "../components/student/FundsReceived";
import MessageBox from "../components/MessageBox";

function NewApplication() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route element={<ApplicationForm />} path="/applicationForm" />
    //     <Route element={<PastApplications />} path="/pastApplications" />
    //     <Route element={<FundsReceived />} path="/fundsReceived" />
    //   </Routes>

    // </BrowserRouter>
    // <ApplicationForm /> //stopped accepting new forms after deadline
    <MessageBox />
  );
}

export default NewApplication;
