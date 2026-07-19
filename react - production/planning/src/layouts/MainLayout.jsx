import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
    return (
        <>
            <Navbar />

            <div
                style={{
                    display: "flex",
                    minHeight: "calc(100vh - 70px)"
                }}
            >
                <Sidebar />

                <div
                    style={{
                        flex: 1,
                        padding: "25px",
                        background: "#f5f5f5"
                    }}
                >
                    {children}
                </div>
            </div>
        </>
    );
}

export default MainLayout;