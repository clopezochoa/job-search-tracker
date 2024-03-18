import './style.css'
import Navbar from "./ui/navbar";
import PostModal from "./ui/post-modal";
import Main from './ui';

export default function Home() {
  return (<>
    <PostModal/>
    <Navbar/>
    <Main/>
  </>
  );
}
