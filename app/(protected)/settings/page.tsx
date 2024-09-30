import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-xl font-semibold text-center">Settings</h1>
        <div className="mb-4 text-gray-700">
          <strong>Session Details:</strong>
          <pre className="p-2 mt-2 overflow-x-auto bg-gray-200 rounded">
            {JSON.stringify(session, null,3)}
          </pre>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
