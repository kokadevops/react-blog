import { FaLaptop, FaTabletAlt, FaMobile } from "react-icons/fa";

const Header = ({ title, width }) => {
    return (
        <header className="Header">
            <h2>{title}</h2>
            {width < 768 ? (
                <FaMobile />
            ) : width < 992 ? (
                <FaTabletAlt />
            ) : (
                <FaLaptop />
            )}
        </header>
    );
};

export default Header;
