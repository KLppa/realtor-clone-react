import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaShareSquare, FaBath, FaParking, FaChair } from "react-icons/fa";
import { FaBedPulse } from "react-icons/fa6";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
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
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Listing() {
  const parmas = useParams();
  const auth = getAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setshareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);

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

      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:max-auto p-4 rounded-lg border-3 shadow-lg bg-white lg:space-x-5">
        <div className="bg-pink-300 w-full h-[400px] lg-[400px]">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - $&nbsp;
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? "/ month" : ""}
          </p>

          <p className="flex items-center mt-6 mb-3 font-semibold">
            <LiaMapMarkerAltSolid className="text-green-700 mr-1 text-2xl" />
            {listing.address}
          </p>

          <div className="flex justify-start items-center space-x-4 w-[75%]">
            {/* Sale */}
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {/* disCount */}
            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>

          {/* Description */}
          <p className="mb-3 mt-3 text-sm">
            <span className="font-semibold text-lg">Description</span> -{" "}
            {listing.description}
          </p>

          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              <FaBedPulse className="text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>

            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>

            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {+listing.parking > 1 ? "Parking Spot" : "No Park"}
            </li>

            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {+listing.furnished > 1 ? "Furnished" : "No Furnished"}
            </li>
          </ul>
          {/* button  Contact Landlord*/}
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm upprecase rounded shadwo-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out"
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>

        <div className="w-full h-[300px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
