import SignInForm from "@components/auth/SignInForm";
import SignUpForm from "@components/auth/SignUpForm";
import AuthLayout from "@pages/AuthLayout";
import NotFound from "@pages/NotFound";
import Home from "@pages/Home";
import Search from "@pages/Search";
import Setting from "@pages/Setting";
import AppLayout from "@layout/AppLayout";
import About from "@pages/about";
import Prompt from "@pages/Prompt";
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

function PromptLayout() {
  //TODO: use react.memo on the input componenets and usecallback on callback function, so we use the same callback function
  return (
    <AppLayout>
      <Prompt />
    </AppLayout>
  );
}

function App() {
  return (
    <>
      {/* <h1 className="text-4xl font-bold font-poppins text-midnight">
        Hello Tailwind v4!
      </h1> */}
      {/* <TestWebPage /> */}
      {/* <DashboardLayout></DashboardLayout> */}
      {/* success */}
      {/* <SearchLayout></SearchLayout> */}
      {/* <FlexTesting /> */}
      {/*put this in a children for a layout*/}
      <SettingLayout></SettingLayout>
      {/* <AboutLayout></AboutLayout> */}
      {/* <PromptLayout></PromptLayout> */}
    </>
  );
}

export default App;
