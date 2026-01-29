import logo from "/assets/images/logo.png";
const Footer = () => {
  return (
    <footer
      className="footer section has-bg-image text-center"
      style={{
        backgroundImage:
          "url('/assets/images/footer-bg.jpg')",
      }}
    >
      <div className="container">

        <div className="footer-top grid-list">

          {/* BRAND */}
          <div className="footer-brand has-before has-after">

            <a href="#" className="logo">
              <img
                src={logo}
                width="260"
                height="60"
                alt="Foodfolio"
              />
            </a>

            <address className="body-4">
              Restaurant St, Delicious City, London 9578, UK
            </address>

            <a
              href="mailto:booking@foodfolio.com"
              className="body-4 contact-link"
            >
              booking@foodfolio.com
            </a>

            <a
              href="tel:+88123123456"
              className="body-4 contact-link"
            >
              Booking Request : +88-123-123456
            </a>

            <p className="body-4">
              Open : 09:00 am - 01:00 pm
            </p>

            <div className="wrapper">
              <div className="separator"></div>
              <div className="separator"></div>
              <div className="separator"></div>
            </div>

            <p className="title-1">Get News & Offers</p>

            <p className="label-1">
              Subscribe & Get <span className="span">25% Off</span>
            </p>

            <form className="input-wrapper">
              <div className="icon-wrapper">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  type="email"
                  placeholder="Your email"
                  className="input-field"
                />
              </div>

              <button className="btn btn-secondary">
                <span className="text text-1">Subscribe</span>
                <span className="text text-2">Subscribe</span>
              </button>
            </form>

          </div>

          {/* LINKS */}
          <ul className="footer-list">
            {["Home", "Menus", "About Us", "Our Chefs", "Contact"].map(
              (item, i) => (
                <li key={i}>
                  <a href="#" className="label-2 footer-link">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>

          {/* SOCIAL */}
          <ul className="footer-list">
            {["Instagram", "YouTube", "Google Map"].map(
              (item, i) => (
                <li key={i}>
                  <a href="#" className="label-2 footer-link">
                    {item}
                  </a>
                </li>
              )
            )}
            <a href="/admin/login" className="label-2 footer-link">
              Admin Panel
            </a>
          </ul>
          

        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Foodfolio. All Rights Reserved | Built by{" "}
            <span className="link">Uttam</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
