import { useAuth } from "../../context/AuthContext";

export default function Navbar() {

    const { logout } = useAuth();

    return (

        <header className="flex justify-between items-center border-b p-5">

            <h2 className="text-2xl font-bold">
                Dashboard
            </h2>

            <button
                onClick={logout}
                className="bg-red-500 px-5 py-2 rounded text-white"
            >
                Logout
            </button>

        </header>

    );

}