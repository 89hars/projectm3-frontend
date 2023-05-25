import Header from "./Header";
import Footer from "./Footer";

function Layouts({ isHomePage, children }) {
  return (
    <div>
      <Header />
      <main
        className={isHomePage ? "home-main" : ""}
        style={{ minHeight: "70vh" }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layouts;
