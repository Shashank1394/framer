// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>
        &copy; {new Date().getFullYear()} My Awesome App. All rights reserved.
      </p>
    </footer>
  );
};

const footerStyle = {
  color: "#f4f4f4",
  textAlign: "center",
  padding: "1rem",
  bottom: 0,
  width: "100%",
};

export default Footer;
