import { links } from "../data/links";

function Footer() {
  return (
    <footer className="site-footer page-width">
      <span>© 2026 Houtan Ghaebi</span>
      <span className="footer-links">
        <a href={links.email}>Email</a>
        <a href={links.cv} target="_blank" rel="noreferrer">CV</a>
      </span>
    </footer>
  );
}

export default Footer;
