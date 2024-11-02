export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh flex flex-col items-center p-5 mb-20">
      <div className="flex flex-col text-sm gap-4 font-mono max-w-xl">
        {children}
      </div>
    </div>
  );
}
