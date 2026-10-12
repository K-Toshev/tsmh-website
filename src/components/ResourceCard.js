export default function ResourceCard({ resource }) {
  return (
    <article className="card h-full">
      <p className="text-sm uppercase tracking-[0.2em] text-indigo-500">{resource.category}</p>
      <h2 className="mt-3 text-xl font-semibold">{resource.title}</h2>
      <p className="mt-3 text-slate-600">{resource.description}</p>
      <a href={resource.link} className="mt-5 inline-block text-sm font-semibold text-indigo-600">
        View resource →
      </a>
    </article>
  );
}
