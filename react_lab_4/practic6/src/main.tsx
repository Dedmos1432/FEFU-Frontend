import Content from "./components/Content";
import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";

export default function Main() {
  return (
    <div>
      <Navbar active="1" />
      <Gallery />
      <Content />
    </div>
  );
}
