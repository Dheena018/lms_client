import Image from "next/image";
import HomePage from "./pages/student/Home";
import Navbar from "./components/students/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-default">
      {/* <Navbar /> */}
      <HomePage />
    </div>
  );
}
