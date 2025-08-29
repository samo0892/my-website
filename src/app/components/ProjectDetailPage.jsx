import { projectsData } from "../../../lib/projectsData";

export default function ProjectDetailPage({ params }) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    return <div className="text-white p-10">Projekt nicht gefunden</div>;
  }

  return (
    <div className="text-white max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-auto rounded-lg mb-6"
      />
      <p className="mb-6">{project.description}</p>

      <div className="flex gap-4">
        {project.gitUrl !== "/" && (
          <a
            href={project.gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            GitHub
          </a>
        )}
        {project.previewUrl !== "/" && (
          <a
            href={project.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
