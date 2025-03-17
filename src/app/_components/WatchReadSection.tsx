export default function WatchReadSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-16">
      {/* Watch Section */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900">🎥 Watch</h2>
        <p className="mt-2 text-lg text-gray-600">
          Learn by watching high-quality video tutorials that break down
          concepts step by step.
        </p>
        <div className="mt-4 w-full h-52 bg-gray-300 rounded-md flex items-center justify-center text-gray-700">
          Video Preview
        </div>
      </div>

      {/* Read Section */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900">📖 Read</h2>
        <p className="mt-2 text-lg text-gray-600">
          Reinforce learning with structured notes, summaries, and interactive
          content.
        </p>
        <div className="mt-4 w-full h-52 bg-gray-300 rounded-md flex items-center justify-center text-gray-700">
          Article Preview
        </div>
      </div>
    </section>
  );
}
