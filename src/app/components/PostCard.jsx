import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../lib/blog";

// Artikelkarte fuer die Blog-Uebersicht und die Startseite. headingLevel
// passt die Ueberschrift an die Seite an: unter dem h1 "Blog" ein h2, unter
// dem h2 des Blog-Abschnitts auf der Startseite ein h3.
const PostCard = ({ post, headingLevel = "h2" }) => {
  const Heading = headingLevel;
  const image = post.ogImage ?? post.image;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full rounded-xl bg-[#181818] overflow-hidden hover:ring-1 hover:ring-emerald-500/50 transition"
    >
      {image && (
        <Image
          src={image}
          alt={post.title}
          width={600}
          height={340}
          className="aspect-[1200/630] w-full object-cover"
        />
      )}
      <div className="p-5">
        <p className="text-xs text-slate-500 mb-2">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {" · "}
          {post.readingTime} Min.
        </p>
        <Heading className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition">
          {post.title}
        </Heading>
        <p className="text-[#ADB7BE] text-sm">{post.description}</p>
      </div>
    </Link>
  );
};

export default PostCard;
