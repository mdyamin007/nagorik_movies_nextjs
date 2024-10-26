const SkeletonDetails = () => {
  return (
    <div className="animate-pulse container mx-auto px-4 py-8">
      <div className="w-full md:w-1/4 h-96 bg-gray-300 rounded-md mb-4 mx-auto"></div>
      <div className="w-full md:w-3/4 h-4 bg-gray-300 rounded-md mb-2"></div>
      <div className="w-full md:w-2/4 h-4 bg-gray-300 rounded-md mb-2"></div>
      <div className="w-full md:w-2/4 h-4 bg-gray-300 rounded-md mb-2"></div>
      <div className="w-full md:w-2/4 h-4 bg-gray-300 rounded-md mb-4"></div>
    </div>
  );
};

export default SkeletonDetails;
