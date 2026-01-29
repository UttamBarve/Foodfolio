import { useEffect, useState } from "react";
import logo from "/assets/images/logo.png";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  let lastScrollY = 0;

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;

      // header active + back to top
      if (currentScroll > 50) {
        setScrolled(true);
        setShowBackTop(true);
      } else {
        setScrolled(false);
        setShowBackTop(false);
      }

      // hide header on scroll down
      if (currentScroll > lastScrollY) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }

      lastScrollY = currentScroll;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="container">
          <address className="topbar-item">
            <div className="icon">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <span className="span">
              Restaurant St, Delicious City, London 9578, UK
            </span>
          </address>

          <div className="separator"></div>

          <div className="topbar-item item-2">
            <div className="icon">
              <ion-icon name="time-outline"></ion-icon>
            </div>
            <span className="span">Daily : 8.00 am to 10.00 pm</span>
          </div>

          <a href="tel:+11234567890" className="topbar-item link">
            <div className="icon">
              <ion-icon name="call-outline"></ion-icon>
            </div>
            <span className="span">+1 123 456 7890</span>
          </a>

          <div className="separator"></div>

          <a href="mailto:booking@restaurant.com" className="topbar-item link">
            <div className="icon">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <span className="span">booking@restaurant.com</span>
          </a>
        </div>
      </div>

      {/* HEADER */}
      <header
        className={`header ${scrolled ? "active" : ""} ${
          hideHeader ? "hide" : ""
        }`}
      >
        <div className="container">
          <a href="#home" className="logo">
            <img src={logo} width="200" height="80" alt="Foodfolio Home" />
          </a>

          {/* NAVBAR */}
          <nav className={`navbar ${navOpen ? "active" : ""}`}>
            <button
              className="close-btn"
              aria-label="close menu"
              onClick={() => setNavOpen(false)}
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>

            {/* <a href="#home" className="logo">
              <img
                src={logo}
                width="200"
                height="70"
                alt="Foodfolio Home"
              />
            </a> */}

            <ul className="navbar-list">
              <li className="navbar-item">
                <a
                  href="#home"
                  className="navbar-link hover-underline"
                  onClick={() => setNavOpen(false)}
                >
                  <div className="separator"></div>
                  <span className="span">Home</span>
                </a>
              </li>

              <li className="navbar-item">
                <a
                  href="#services"
                  className="navbar-link hover-underline"
                  onClick={() => setNavOpen(false)}
                >
                  <div className="separator"></div>
                  <span className="span">Services</span>
                </a>
              </li>

              <li className="navbar-item">
                <a
                  href="#about"
                  className="navbar-link hover-underline"
                  onClick={() => setNavOpen(false)}
                >
                  <div className="separator"></div>
                  <span className="span">About Us</span>
                </a>
              </li>

              <li className="navbar-item">
                <a
                  href="#menu"
                  className="navbar-link hover-underline"
                  onClick={() => setNavOpen(false)}
                >
                  <div className="separator"></div>
                  <span className="span">Menu</span>
                </a>
              </li>

              <li className="navbar-item">
                <a
                  href="#reservation"
                  className="navbar-link hover-underline"
                  onClick={() => setNavOpen(false)}
                >
                  <div className="separator"></div>
                  <span className="span">Contact</span>
                </a>
              </li>
            </ul>

            <div className="text-center">
              <p className="headline-1 navbar-title">Visit Us</p>
              <address className="body-4">
                Restaurant St, Delicious City, <br />
                London 9578, UK
              </address>

              <p className="body-4 navbar-text">Open: 9.30 am - 2.30pm</p>

              <a
                href="mailto:booking@Foodfolio.com"
                className="body-4 sidebar-link"
              >
                booking@Foodfolio.com
              </a>

              <div className="separator"></div>

              <p className="contact-label">Booking Request</p>

              <a href="tel:+88123123456" className="body-1 contact-number">
                +88-123-123456
              </a>
            </div>
          </nav>

          <a href="#reservation" className="btn btn-secondary">
            <span className="text text-1">Find A Table</span>
            <span className="text text-2">Find A Table</span>
          </a>

          <button
            className="nav-open-btn"
            aria-label="open menu"
            onClick={() => setNavOpen(true)}
          >
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </button>

          <div
            className={`overlay ${navOpen ? "active" : ""}`}
            onClick={() => setNavOpen(false)}
          ></div>
        </div>
      </header>

      {/* BACK TO TOP */}
      <a
        href="#top"
        className={`back-top-btn ${showBackTop ? "active" : ""}`}
        aria-label="back to top"
      >
        <ion-icon name="chevron-up"></ion-icon>
      </a>
    </>
  );
};

export default Header;
