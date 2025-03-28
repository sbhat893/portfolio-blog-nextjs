import React from "react";

// Mock Next.js Image component
const NextImageMock = ({ src = "", alt = "", ...props }: { src?: string; alt?: string }) => {
  return React.createElement("img", { src, alt, ...props });
};

export default NextImageMock;
