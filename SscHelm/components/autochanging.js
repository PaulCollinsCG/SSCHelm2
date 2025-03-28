// import { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

// const AutoChangingContent = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
  
//   // Sample content - replace with your actual content
//   const pages = [
//     {
//       title: "Welcome to Our Site",
//       content: "This is our main welcome message and introduction.",
//       backgroundColor: "bg-blue-100"
//     },
//     {
//       title: "Featured Products",
//       content: "Check out our latest products and special offers.",
//       backgroundColor: "bg-green-100"
//     },
//     {
//       title: "About Us",
//       content: "Learn about our company's history and mission.",
//       backgroundColor: "bg-purple-100"
//     }
//   ];

//   useEffect(() => {
//     if (!isPaused) {
//       const timer = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % pages.length);
//       }, 60000); // Change every minute

//       return () => clearInterval(timer);
//     }
//   }, [isPaused, pages.length]);

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % pages.length);
//   };

//   const goToPrevious = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + pages.length) % pages.length);
//   };

//   const togglePause = () => {
//     setIsPaused(!isPaused);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className={`rounded-lg shadow-lg p-8 transition-all duration-500 ${pages[currentIndex].backgroundColor}`}>
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold mb-4">{pages[currentIndex].title}</h2>
//           <p className="text-lg">{pages[currentIndex].content}</p>
//         </div>
        
//         <div className="flex items-center justify-between mt-8">
//           <button
//             onClick={goToPrevious}
//             className="p-2 rounded-full hover:bg-gray-200"
//             aria-label="Previous page"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
          
//           <div className="flex items-center gap-4">
//             <button
//               onClick={togglePause}
//               className="p-2 rounded-full hover:bg-gray-200"
//               aria-label={isPaused ? "Resume" : "Pause"}
//             >
//               {isPaused ? (
//                 <Play className="w-6 h-6" />
//               ) : (
//                 <Pause className="w-6 h-6" />
//               )}
//             </button>
//             <span className="text-sm">
//               Page {currentIndex + 1} of {pages.length}
//             </span>
//           </div>
          
//           <button
//             onClick={goToNext}
//             className="p-2 rounded-full hover:bg-gray-200"
//             aria-label="Next page"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AutoChangingContent;