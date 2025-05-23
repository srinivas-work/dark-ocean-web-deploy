import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import Footer from "./components/NormalComponents/Footer/Footer";
import Header from "./components/NormalComponents/Header/Header";
import ContactUsOverlay from "./components/NormalComponents/Overlays/ContactUsOverlay/ContactUsOverlay";
import CareerOverlay from "./components/NormalComponents/Overlays/JobOverlay/CareerOverlay";
import ServicesOverlay from "./components/NormalComponents/Overlays/ServicesOverlay/ServicesOverlay";
import Test from "./components/NormalComponents/Test";
import AnimatedContactButton from "./components/UI/AnimatedContactButton/AnimatedContactButton";
import LenisScrollHelper from "./components/utils/helpers/LenisScrollHelper";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import HomePage from "./pages/HomePage/HomePage";
import BlogPage from "./pages/PressReleasePage/BlogPage/BlogPage";
import PressReleasePage from "./pages/PressReleasePage/PressReleasePage";
import ServicePage from "./pages/ServicePage/ServicePage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutUsPage /> },
  { path: "/services", element: <ServicePage /> },
  {
    path: "/press-release",
    element: <PressReleasePage />,
  },
  {
    path: "/press-release/:blogName",
    element: <BlogPage />,
  },
];

const CustomRoutes = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className={styles.App}>
      {!isHomePage && <LenisScrollHelper />}
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
};

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      <Test />
      <AnimatedContactButton />
      <CustomRoutes />
      {!isHomePage && <Footer className={styles.Footer} />}
      <ContactUsOverlay />
      <ServicesOverlay />
      <CareerOverlay />
    </>
  );
};

export default App;
