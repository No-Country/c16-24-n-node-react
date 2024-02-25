import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Content from "./components/Content";

function App() {
  return (
    <div className="flex fixed w-full h-full pr-5">
      <Sidebar className="sidebar" />
      <div className="block w-full">
        <Header className="header" />
        <div className="w-full h-full overflow-auto pl-6 pr-3">
          <Content />
        </div>
      </div>
    </div>
  );
}
export default App;
