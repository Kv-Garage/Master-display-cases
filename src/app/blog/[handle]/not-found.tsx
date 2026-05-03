import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function BlogNotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="container-custom max-w-2xl text-center py-16">
        <h1 className="text-6xl font-bold text-black mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-8">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/blog" className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            Browse All Articles
          </Link>
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}