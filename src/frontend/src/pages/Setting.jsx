import PageBreadcrumb from "@components/common/PageBreadCrumb";
import ComponentCard from "@components/common/ComponentCard";
import PageMeta from "@components/common/PageMeta";
import BasicTableOne from "@components/tables/BasicTableOne";
import Switch from "@/components/form/Switch";
import Button from "@/components/ui/Button";
// TODO: Make an object that holds all the information and map it later

/*
Note: for switches attach on an onchange event for them, if they change values, update it in db
*/

const settings = [
  {
    title: "Enable Email Notification",
    description: "descriptionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    toggle: true,
    buttonText: null,
  },
  {
    title: "Enable Dark Mode",
    description: "",
    toggle: true,
    buttonText: null,
  },
  {
    title: "Enable Confirm before delete",
    description: "descriptionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    toggle: true,
    buttonText: null,
  },
  {
    title: "Delete Account",
    description: "descriptionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    toggle: false,
    buttonText: "Delete Account",
  },
  {
    title: "Change Password",
    description:
      "descriptionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Non google oauth account might not use google oauth",
    toggle: false,
    buttonText: "Change Password",
  },
  {
    title: "Clear Data",
    description: "description",
    toggle: false,
    buttonText: "Clear Data",
  },
  {
    title: "Report Crash",
    description: "description",
    toggle: false,
    buttonText: "Report Crash",
  },
];

export default function Setting() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="space-y-6 md:ml-[25%] md:mr-[25%]">
        <ComponentCard isSearch={false} title="Setting">
          {settings.map((setting, index) => {
            return (
              <div key={index}>
                <div className="grid grid-cols-[1fr_auto] items-center ml-5 mr-5 gap-6">
                  <div className="md:w-[75%] mr-10">
                    <h1 className="break-words">{setting.title}</h1>
                    <div className="my-1"></div>
                    <p className="break-all text-gray-500 text-[0.9rem]">
                      {setting.description}
                    </p>
                  </div>
                  {setting.toggle ? (
                    <Switch></Switch>
                  ) : (
                    <Button className="h-[2.75rem] w-[6rem] bg-gray-700">
                      <h1>{setting.buttonText}</h1>
                    </Button>
                  )}
                </div>
                {index + 1 != settings.length && (
                  <div className="my-4 border-t border-gray-200" />
                )}
              </div>
            );
          })}
        </ComponentCard>
      </div>
    </>
  );
}
