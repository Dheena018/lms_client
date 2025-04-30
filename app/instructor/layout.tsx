import Navbar from "../components/instructors/navbar";
import Sidebar from "../components/instructors/sideBar";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Sidebar />
    </>
  );
}
