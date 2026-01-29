import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await apiRequest("/api/menu");
        setMenuData(data);
      } catch (err) {
        console.error("Failed to fetch menu", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <section className="section menu" id="menu" aria-label="menu">
      <div className="container">

        <p className="section-subtitle text-center label-2">
          Special Selection
        </p>

        <h2 className="headline-1 section-title text-center">
          Delicious Menu
        </h2>

        <ul className="grid-list">
          {loading ? (
            <p style={{ textAlign: "center" }}>Loading menu...</p>
          ) : (
            menuData.map((item) => (
              <li key={item._id}>
                <div className="menu-card hover:card">

                  <figure
                    className="card-banner img-holder"
                    style={{ "--width": 100, "--height": 100 }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-cover"
                    />
                  </figure>

                  <div>
                    <div className="title-wrapper">
                      <h3 className="title-3">
                        <a href="#" className="card-title">
                          {item.name}
                        </a>
                      </h3>

                      {item.tag && (
                        <span className="badge label-1">
                          {item.tag}
                        </span>
                      )}

                      <span className="span title-2">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="card-text label-1">
                      {item.description}
                    </p>
                  </div>

                </div>
              </li>
            ))
          )}
        </ul>

        <p className="menu-text text-center">
          During winter daily from{" "}
          <span className="span">7:00 pm</span> to{" "}
          <span className="span">9:00 pm</span>
        </p>

        <a href="#" className="btn btn-primary">
          <span className="text text-1">View All Menu</span>
          <span className="text text-2">View All Menu</span>
        </a>

        <img
          src="/assets/images/shape-5.png"
          className="shape shape-2 move-anim"
          alt=""
        />
        <img
          src="/assets/images/shape-6.png"
          className="shape shape-3 move-anim"
          alt=""
        />

      </div>
    </section>
  );
};

export default Menu;
