import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Content from "./components/Content";

function App() {
  return (
    <div className="flex fixed w-full h-full pr-5">
      <Sidebar className="sidebar" />
      <div className="block w-full">
        <Header className="header" />
        <div className="w-full overflow-auto md:pl-6 md:pr-3 sm:pl-3 sm:pr-0 h-[calc(100%-65px)]">
          <Content />
        </div>
      </div>
    </div>
  );
}
export default App;
