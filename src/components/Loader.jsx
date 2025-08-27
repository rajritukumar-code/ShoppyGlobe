import { BiLoaderAlt } from "react-icons/bi";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-95">
      <BiLoaderAlt className="text-[#40E0D0] w-16 h-16 animate-spin" />
      <p className="mt-4 max-[350px]:text-sm text-lg text-gray-700 ">Loading, please wait...</p>
    </div>
  );
}
