import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaShareSquare } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
  A11y,
} from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  const parmas = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setshareLinkCopied] = useState(false);

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", parmas.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
        // console.log(listing);
      }
    }
    fetchListing();
    // listing, parmas.listingId
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        modules={[Navigation, Pagination, A11y, EffectFade, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[350px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* share button */}
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white  cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setshareLinkCopied(true);
          setTimeout(() => {
            setshareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShareSquare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
          Link Copied
        </p>
      )}
    </main>
  );
}
