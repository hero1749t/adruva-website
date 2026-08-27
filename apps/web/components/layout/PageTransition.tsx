"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  // Disable transition unmounting for nested admin layout routes to keep the sidebar stable.
  const transitionKey = pathname.startsWith("/admin")
    ? "/admin-stable"
    : pathname;

  return (
    <motion.div
      key={transitionKey}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
