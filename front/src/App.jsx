import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Content from "./components/Content";

function App() {
  return (    
      <div className="flex">
        <Sidebar className="sidebar" />
        <div className="block w-full">
          <Header className="header" />
          <Content className="content" />    
        </div>        
      </div>    
  );
}
export default App;