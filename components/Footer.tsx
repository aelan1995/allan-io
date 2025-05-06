export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 text-sm py-6 px-4 mt-16 border-t border-slate-800">
      <div className="max-w-5xl mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">Allan.io</span> — All
          rights reserved.
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Built with 💻 Next.js, Tailwind CSS, and ❤️ for automation
        </p>
      </div>
    </footer>
  );
}
