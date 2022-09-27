import logo from "./images/logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <img src={logo} alt="" className={styles.logo} />
      </div>
    </>
  );
};
export default Header;
