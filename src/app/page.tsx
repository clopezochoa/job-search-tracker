import Image from "next/image";
import './style.css'
import Navbar from "./navbar";
import Timeline from "./timeline/timeline";
import PostModal from "./post-modal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PostModal/>
      <Navbar/>
      <Timeline/>
    </main>
  );
}
