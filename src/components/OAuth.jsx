import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { getDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
export default function OAuth() {
  const navgiate = useNavigate();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const user = result.user;

      // check for the user

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navgiate("/");
    } catch (error) {
      console.log(2);
      toast.error("Could not authorize with Google");
    }
  };
  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex items-center justify-center w-full bg-red-700 px-7 py-3 uppercase text-sm font-medium 
    text-white hover:bg-red-800 active:bg-red-900 hover:shadow-lg active:shadow-lg transition duration-50 ease-in-out rounded "
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" /> Continue with
      Google
    </button>
  );
}
