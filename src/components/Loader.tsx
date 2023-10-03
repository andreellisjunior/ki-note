import loader from "../assets/loader.gif";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full col-span-4 row-span-4">
      <img src={loader} />;
    </div>
  );
};

export default Loader;
