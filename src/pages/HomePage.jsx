import Layouts from "../components/Layouts";
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <Layouts isHomePage={isHomePage}>
      <h1 className="d-flex align-items-center justify-content-center"> Name </h1>
    </Layouts>
  );
};

export default HomePage;