import Image from "next/image";
import './style.css'
import Navbar from "./ui/navbar";
import Timeline from "./timeline/timeline";
import PostModal from "./ui/post-modal";
import Tools from "./ui/tools";

export default function Home() {
  return (<>
    <PostModal/>
    <Navbar/>
    <main className="flex min-h-screen items-start justify-between">
      <div className="flex justify-start pt-20">
        <Tools/>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <Timeline/>
      </div>
      <div className="flex justify-start pt-20 w-52">
      </div>
    </main>
  </>
  );
}
