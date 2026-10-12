import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResourceCard from '@/components/ResourceCard';
import { resources } from '@/data/resources';

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-500">Resources</p>
          <h1 className="mt-2 text-3xl font-bold">Useful club resources</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.title} resource={resource} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
