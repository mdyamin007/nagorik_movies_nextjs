import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
  <div className="text-center">
    <h1 className="text-9xl font-extrabold text-yellow-500 dark:text-yellow-400">404</h1>
    <p className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
      Oops! Page not found
    </p>
    <p className="text-gray-600 dark:text-white mt-2">
      The page you’re looking for doesn’t exist.
    </p>
    <Link href="/" className="inline-block mt-6 px-6 py-3 text-sm font-medium text-black bg-yellow-500 rounded-full transition-colors">
      Go back home
    </Link>
  </div>
</div>
  )
}