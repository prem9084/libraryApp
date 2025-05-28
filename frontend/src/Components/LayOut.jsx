import Sidebar from "./SideBar";
import Navbar from "./NavBar";

const LayOut = ({ children, showSidebar = false }) => {
  return (
    <div className="h-screen">
      <div className="flex">
        {showSidebar && <Sidebar />}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default LayOut;
