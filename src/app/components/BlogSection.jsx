"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { blogsData } from "../../lib/blogsData";

const BlogsSection = () => {
  const [tag, setTag] = useState("Alle");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredBlogs = blogsData.filter((blog) =>
    blog.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="blogs" className="mt-24">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        Blogartikel
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="Alle"
          isSelected={tag === "Alle"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Shopify"
          isSelected={tag === "Shopify"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredBlogs.map((blog, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={blog.id}
              title={blog.title}
              description={blog.description}
              imgUrl={blog.image}
              gitUrl={blog.gitUrl}
              pageUrl={blog.pageUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default BlogsSection;
