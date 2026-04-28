import Image from 'next/image';

interface BlogImageProps {
  title: string;
  category: string;
  src?: string;
  alt?: string;
  className?: string;
}

export default function BlogImage({
  title,
  category,
  src,
  alt = title,
  className = '',
}: BlogImageProps) {
  // Map categories to gradient colors for consistent branding
  const categoryGradients: Record<string, string> = {
    'ROI Strategy': 'from-green-600/40 to-emerald-800/40',
    'Lighting': 'from-purple-600/40 to-blue-800/40',
    'Industry Insights': 'from-blue-600/40 to-indigo-800/40',
    'Visual Merchandising': 'from-pink-600/40 to-rose-800/40',
    'Shipping & Logistics': 'from-orange-600/40 to-amber-800/40',
    'default': 'from-purple-600/40 to-blue-800/40',
  };

  const gradient = categoryGradients[category] || categoryGradients['default'];

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {/* Background Image or Placeholder */}
      <div className="relative aspect-[16/9]">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          // Premium placeholder with dark background and subtle pattern
          <div className="absolute inset-0 bg-gray-900">
            {/* Subtle grid pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            
            {/* Blurred retail scene silhouette effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gray-800/30 blur-3xl" />
            </div>
            
            {/* Product silhouette placeholder */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-gradient-to-t from-gray-800/50 to-transparent" />
          </div>
        )}

        {/* Dark Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* RGB Glow Accent - Top Right */}
        <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${gradient} blur-3xl opacity-60`} />
        
        {/* RGB Glow Accent - Bottom Left */}
        <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${gradient} blur-2xl opacity-40`} />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 mb-2 drop-shadow-lg">
            {title}
          </h3>

          {/* Bottom CTA Text */}
          <div className="flex items-center space-x-2 text-green-400 text-xs font-semibold uppercase tracking-wider">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>Increase Store Revenue</span>
          </div>
        </div>

        {/* Hover Effect - Subtle zoom */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} mix-blend-overlay opacity-50`} />
        </div>
      </div>
    </div>
  );
}