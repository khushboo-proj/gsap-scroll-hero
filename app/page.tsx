import Hero from "./components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="h-[200vh] bg-gray-100 flex items-center justify-center text-4xl font-bold">
        Continue Scrolling
      </section>
    </main>
  );
}