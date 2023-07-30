import "./Loader.css";
import LoadingBoogie from "../../assets/loadingboogie.gif";

const Loader = () => {
  return (
    <>
      <div className="loader-container">
        <img src={LoadingBoogie} className="loader-img"></img>
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
