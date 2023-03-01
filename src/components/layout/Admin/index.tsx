import React from "react";
import Header from "@/components/layout/Admin/Header";
import Sidebar from "@/components/layout/Admin/Sidebar";

type Props = {
  children: React.ReactNode;
  [k: string]: any;
};
const AdminLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <Sidebar />

      <div className="p-4 sm:ml-64 h-[calc(100vh)] bg-[#e4e4e7]">
        <div className="p-4 border-2 bg-white rounded-lg mt-14">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
