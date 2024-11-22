interface AuthImagePatternProps {
  title: string;
  subtitle: string;
}

export default function AuthImagePattern({
  title,
  subtitle,
}: AuthImagePatternProps) {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="flex w-full h-full items-center justify-center animate-pulse p-5">
          <img
            src="/logo-512x512.webp"
            alt="logo"
            className="rounded-full w-64 h-64"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
}
