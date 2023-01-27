import React from "react";

const Footer = () => {
    const date = new Date().getFullYear();
    return <footer className="Footer">koka &copy; {date} </footer>;
};

export default Footer;
