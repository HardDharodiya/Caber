// import React, { useEffect, useState } from "react";
// import User from "../assets/dummy-user.jpg";
// import { getRouteData, getUserById } from "../utils/getUserData";

const RidePopUp = (props) => {};
//   const [route, setRoute] = useState(null);
//   const [user, setUser] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const currentRide = route?.routes?.[currentIndex];

//   const handleNextRide = () => {
//     if (currentIndex < route?.routes?.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       console.log("No more rides available.");
//       props.setRidePopUpPanel(false);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const routes = await getRouteData();
//       const user = await getUserById(routes?.routes?.[0]?.userId);
//       if (user) {
//         setUser(user);
//       }
//       if (routes) {
//         setRoute(routes);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h3 className="text-2xl font-semibold text-yellow-50 mb-5">
//         New <span className="text-[#9A6AFF]">Ride</span> Available!
//       </h3>

//       {currentRide ? (
//         <>
//           <div className="flex justify-between items-center mb-4 p-2">
//             <div className="flex items-center gap-3">
//               <img
//                 src={User}
//                 alt=""
//                 className="h-10 w-10 rounded-full object-cover"
//               />
//               {console.log("user", user)}
//               <h4 className="text-lg font-medium text-white">
//                 {user?.user?.firstName.charAt(0).toUpperCase() +
//                   user?.user?.firstName.slice(1) +
//                   " " +
//                   user?.user?.lastName || "N/A"}
//               </h4>
//             </div>

//             <div>
//               <h3 className="text-xl font-medium text-green-500">
//                 {"₹" + currentRide.cost}
//               </h3>
//               <p className="text-lg mt-1 text-gray-200">
//                 {currentRide.distance + " KM" || "N/A"}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-3 justify-between flex-col items-center">
//             <div className="w-full bg-[#fdfdfd] p-3 rounded-xl gap-3 my-2">
//               <div className="flex items-center gap-5">
//                 <i className="ri-map-pin-user-fill text-lg"></i>
//                 <div>
//                   <h3 className="text-lg font-medium">562/11-A</h3>
//                   <p className="text-sm mt-1 text-gray-600">
//                     {currentRide.origin.charAt(0).toUpperCase() +
//                       currentRide.origin.slice(1)}
//                   </p>
//                 </div>
//               </div>

//               <div className="border border-[#3d404f2c] w-full my-3"></div>

//               <div className="flex items-center gap-5">
//                 <i className="ri-map-pin-2-fill text-lg"></i>
//                 <div>
//                   <h3 className="text-lg font-medium">562/11-A</h3>
//                   <p className="text-sm mt-1 text-gray-600">
//                     {currentRide.destination.charAt(0).toUpperCase() +
//                       currentRide.destination.slice(1)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex mt-2 gap-5 w-full items-center flex-col justify-between">
//               <button
//                 onClick={() => {
//                   props.setConfirmRidePopUpPanel(true);
//                   props.setCurrentRide(currentRide);
//                   props.setCurrentUser(user?.user);
//                   handleNextRide();
//                 }}
//                 className="w-full bg-[#9A6AFF] font-semibold p-4 px-8 rounded-xl"
//               >
//                 Accept
//               </button>

//               <button
//                 onClick={() => {
//                   handleNextRide();
//                 }}
//                 className="w-full bg-orange-500 font-semibold p-4 px-8 rounded-xl"
//               >
//                 Ignore
//               </button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <p className="text-white text-center">No more rides available.</p>
//       )}
//     </div>
//   );
// };

export default RidePopUp;
