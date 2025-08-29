"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Emily R.",
    role: "E-Commerce Manager",
    image: "/images/testimonial-emily.jpg",
    quote:
      "Sam hat uns ein maßgeschneidertes Shopify-Theme erstellt, das unsere Konversionsrate verdoppelt hat. Schnell, zuverlässig und sehr kommunikativ – sehr zu empfehlen!",
  },
  {
    name: "Lucas M.",
    role: "Startup Founder",
    image: "/images/testimonial-lucas.jpg",
    quote:
      "Die von Sam entwickelte Shopify Custom Section hat uns jede Woche viele Stunden manueller Arbeit erspart. Sauberer Code und hervorragende Leistung.",
  },
  {
    name: "Sophie K.",
    role: "Creative Director",
    image: "/images/testimonial-sophie.jpg",
    quote:
      "Die Zusammenarbeit mit Sam war perfekt. Sein Gespür für Design und sein technisches Know-how machen ihn zum idealen Partner für jedes anspruchsvolle Shopify-Projekt.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const TestimonialsSection = () => {
  return (
    <section className="mt-32 py-16 px-4 bg-[#121212]" id="testimonials">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        Was meine Kunden sagen
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-[#1e1e1e] rounded-xl p-6 text-white shadow-lg hover:shadow-emerald-500/20 transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              {/* <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={50}
                height={50}
                className="rounded-full object-cover"
              /> */}
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-300">&quot;{testimonial.quote}&quot;</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
