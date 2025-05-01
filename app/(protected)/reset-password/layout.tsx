export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden px-4 fixed inset-0">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
} 