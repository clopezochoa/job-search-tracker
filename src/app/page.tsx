import Image from "next/image";
import './style.css'
import Navbar from "./ui/navbar";
import Timeline from "./timeline/timeline";
import PostModal from "./ui/post-modal";

export default function Home() {
  return (<>
    <Navbar/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PostModal/>
      <Timeline/>
    </main>
  </>
  );
}
