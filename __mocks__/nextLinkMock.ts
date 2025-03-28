import React from "react";

const Link = ({ href, children, ...props }: { href: string; children: React.ReactNode }) => {
  return React.createElement("a", { href, ...props }, children);
};

export default Link;
