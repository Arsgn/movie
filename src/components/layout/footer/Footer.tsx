import React from "react";
import scss from "./Footer.module.scss";
import { IoLogoAngular } from "react-icons/io";

const Footer = () => {
  return (
    <footer className={scss.footer}>
      <div className={scss.footer_top}>
        <div className={scss.container}>
          <div className={scss.footer_grid}>
            {/* Logo and About */}
            <div className={scss.footer_brand}>
              <a href="/" className={scss.footer_logo}>
                <div className={scss.logo_icon}>
                  <div className={scss.logo_glow}></div>
                  <IoLogoAngular />
                </div>
                <span className={scss.logo_text}>
                  <span className={scss.logo_text_movie}>Alpha</span>
                  <span className={scss.logo_text_time}>Cinema</span>
                </span>
              </a>
              <p className={scss.footer_about}>
                Ваш лучший источник для просмотра фильмов и сериалов. Открывайте
                новые истории каждый день.
              </p>
              <div className={scss.social_links}>
                {["Facebook", "Twitter", "Instagram", "YouTube"].map(
                  (label, index) => (
                    <a
                      key={index}
                      href="#"
                      className={scss.social_link}
                      aria-label={label}
                    >
                      {/* SVGs оставил такие же — можешь заменить иконки через react-icons или любую lib */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className={scss.footer_links}>
              <h3 className={scss.footer_heading}>Быстрые ссылки</h3>
              <ul className={scss.footer_nav}>
                {["Главная", "Фильмы", "Сериалы", "Новинки", "Популярное"].map(
                  (text, i) => (
                    <li key={i}>
                      <a href="#" className={scss.footer_nav_link}>
                        {text}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Categories */}
            <div className={scss.footer_links}>
              <h3 className={scss.footer_heading}>Категории</h3>
              <ul className={scss.footer_nav}>
                {["Боевики", "Комедии", "Драмы", "Ужасы", "Фантастика"].map(
                  (cat, i) => (
                    <li key={i}>
                      <a href="#" className={scss.footer_nav_link}>
                        {cat}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Newsletter */}
            <div className={scss.footer_newsletter}>
              <h3 className={scss.footer_heading}>Подпишитесь на новости</h3>
              <p className={scss.newsletter_text}>
                Получайте уведомления о новых фильмах и эксклюзивных
                предложениях
              </p>
              <form className={scss.newsletter_form}>
                <div className={scss.newsletter_input_group}>
                  <input
                    type="email"
                    placeholder="Ваш email"
                    className={scss.newsletter_input}
                    required
                  />
                  <button type="submit" className={scss.newsletter_button}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={scss.footer_bottom}>
        <div className={scss.container}>
          <div className={scss.footer_bottom_content}>
            <p className={scss.copyright}>
              © 2025 MovieTime. Все права защищены.
            </p>
            <div className={scss.footer_bottom_links}>
              {[
                "Условия использования",
                "Политика конфиденциальности",
                "Помощь",
              ].map((link, i) => (
                <a key={i} href="#" className={scss.footer_bottom_link}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
