import { useState, useEffect } from "react";
import scss from "./Header.module.scss";
import { IoLogoAngular } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { links } from "../../../constants/Links";
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="header" className={scrolled ? scss.scrolled : ""}>
      <div className={scss.container}>
        <div className={scss.header_content}>
          <a href="/product" className={scss.logo}>
            <div className={scss.logo_icon}>
              <div className={scss.logo_glow}></div>

              <IoLogoAngular onClick={() => navigate("/product")} />
            </div>
            <span className={scss.logo_text}>
              <span className={scss.logo_text_movie}>Alpha</span>
              <span className={scss.logo_text_time}>Cinema</span>
              <span className={scss.logo_underline}></span>
            </span>
          </a>

          {/* <nav className={scss.desktop_nav}>
            <a href="/movies" className={scss.nav_link}>
              Movies<span className={scss.nav_link_underline}></span>
            </a>
            {links.map((item, index) => (
              <Link key={index} className={scss.link} to={item.link}></Link>
            ))}
            <div className={scss.dropdown}>
              <button className={scss.dropdown_button}>
                Genres
                <svg
                  className={scss.dropdown_icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <span className={scss.nav_link_underline}></span>
              </button>
              <div className={scss.dropdown_content}>
                <a href="/genres/action" className={scss.dropdown_item}>
                  Action
                </a>
                <a href="/genres/comedy" className={scss.dropdown_item}>
                  Comedy
                </a>
                <a href="/genres/drama" className={scss.dropdown_item}>
                  Drama
                </a>
                <a href="/genres/horror" className={scss.dropdown_item}>
                  Horror
                </a>
              </div>
            </div>
            <a href="/tv-shows" className={scss.nav_link}>
              TV Shows<span className={scss.nav_link_underline}></span>
            </a>
            <a href="/new-releases" className={scss.nav_link}>
              New Releases<span className={scss.nav_link_underline}></span>
            </a>
          </nav> */}

          <div className={scss.actions}>
            <div className={scss.search_container}>
              <form
                className={`${scss.search_form} ${
                  searchActive ? scss.active : ""
                }`}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Search movies..."
                  className={scss.search_input}
                />
                <button
                  type="button"
                  className={scss.search_close}
                  onClick={() => setSearchActive(false)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </form>

              <h3 className={scss.ic}>
                <MdOutlineMenu />
              </h3>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
