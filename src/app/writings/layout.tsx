export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center text-sm gap-4 font-sans w-full">
      {children}
    </div>
  );
}
