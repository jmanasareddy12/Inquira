import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
    children
}: {
    children: ReactNode;
}) {

    return (

        <div className="flex">

            <Sidebar />

            <main className="flex-1">

                <Navbar />

                <div className="p-8">

                    {children}

                </div>

            </main>

        </div>

    );

}