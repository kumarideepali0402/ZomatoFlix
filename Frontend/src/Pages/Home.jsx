export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">
        Welcome to FoodLink 🍽️
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Connecting customers and food partners effortlessly.
      </p>
      <p className="text-gray-500">
        Use the navbar above to register or log in.
      </p>
    </div>
  );
}
