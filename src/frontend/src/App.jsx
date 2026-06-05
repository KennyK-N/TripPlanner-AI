import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import AuthLayout from "./pages/AuthLayout";
import NotFound from "./pages/NotFound";
import Home from "@/pages/Home";
import Search from "@pages/Search";
import Setting from "@pages/Setting";
import AppLayout from "@/layout/AppLayout";
import About from "@/pages/about";
console.log("API URL:", import.meta.env.VITE_API_URL);
console.log("MODE:", import.meta.env.MODE);

function TestWebPage() {
  return (
    <>
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
      <NotFound></NotFound>
    </>
  );
}

function DashboardLayout() {
  return (
    <AppLayout>
      <Home></Home>
    </AppLayout>
  );
}

function SearchLayout() {
  return (
    <AppLayout>
      <Search></Search>
    </AppLayout>
  );
}

function SettingLayout() {
  return (
    <AppLayout>
      <Setting></Setting>
    </AppLayout>
  );
}

function AboutLayout() {
  return (
    <AppLayout>
      <About></About>
    </AppLayout>
  );
}

import CustomSelect from "@components/form/CustomSelect";

function App() {
  return (
    <>
      {/* <TestWebPage /> */}
      {/* <DashboardLayout></DashboardLayout> */}
      {/* <SearchLayout></SearchLayout> */}
      {/* <SettingLayout></SettingLayout> */}
      {/* <AboutLayout></AboutLayout> */}
    </>
  );
}

export default App;
