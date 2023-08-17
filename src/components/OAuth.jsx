import { FcGoogle } from "react-icons/fc";
export default function OAuth() {
  return (
    <button
      className="flex items-center justify-center w-full bg-red-700 px-7 py-3 uppercase text-sm font-medium 
    text-white hover:bg-red-800 active:bg-red-900 hover:shadow-lg active:shadow-lg transition duration-50 ease-in-out rounded "
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" /> Continue with
      Google
    </button>
  );
}
