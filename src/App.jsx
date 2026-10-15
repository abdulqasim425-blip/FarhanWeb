import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Work from "./components/Work";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";

import Profile from "./components/pages/Profile";
import EditProfile from "./components/pages/EditProfile";
import Settings from "./components/pages/Settings";
import Appearance from "./components/pages/Appearance";
import Language from "./components/pages/Language";
import BillingPlan from "./components/pages/BillingPlan";
import BillingInvoices from "./components/pages/BillingInvoices";
import BillingPayment from "./components/pages/BillingPayment";
import Help from "./components/pages/Help";
import Report from "./components/pages/Report";

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Process />
      <Pricing />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/appearance" element={<Appearance />} />
        <Route path="/settings/language" element={<Language />} />
        <Route path="/billing/plan" element={<BillingPlan />} />
        <Route path="/billing/invoices" element={<BillingInvoices />} />
        <Route path="/billing/payment" element={<BillingPayment />} />
        <Route path="/help" element={<Help />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      <Footer />
    </>
  );
}
