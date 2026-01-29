const Service = () => {
  return (
    <section className="section service bg-black-10 text-center">
      <div className="container">

        <p className="section-subtitle label-2">Flavors For Royalty</p>
        <h2 className="headline-1 section-title">We Offer Top Notch</h2>

        <p className="section-text">
          Premium-quality food crafted with passion, hygiene, and love.
        </p>

        <ul className="grid-list">
          {[
            { img: "service-1.jpg", title: "Breakfast" },
            { img: "service-2.jpg", title: "Appetizers" },
            { img: "service-3.jpg", title: "Drinks" },
          ].map((item, i) => (
            <li key={i}>
              <div className="service-card">
                <a href="#" className="has-before hover:shine">
                  <figure
                    className="card-banner img-holder"
                    style={{ "--width": 285, "--height": 336 }}
                  >
                    <img
                      src={`/assets/images/${item.img}`}
                      alt={item.title}
                      className="img-cover"
                    />
                  </figure>
                </a>

                <div className="card-content">
                  <h3 className="title-4 card-title">
                    <a href="#menu">{item.title}</a>
                  </h3>

                  <a href="#menu" className="btn-text hover-underline label-2">
                    View Menu
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <img
          src="/assets/images/shape-1.png"
          className="shape shape-1 move-anim"
          alt=""
        />
        <img
          src="/assets/images/shape-2.png"
          className="shape shape-2 move-anim"
          alt=""
        />
      </div>
    </section>
  );
};

export default Service;
