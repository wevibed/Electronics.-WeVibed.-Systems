import React, { useState } from "react";

// Product photos are intentionally left blank until the shop supplies real images.
export default function ProductPhoto({ product, className = "", ratio = "1 / 1" }) {
  const [failed, setFailed] = useState(false);
  if (product.image && !failed) {
    return (
      <img
        src={`/${product.image.replace(/^\//, "")}`}
        alt={product.name}
        loading="lazy"
        decoding="async"
        width="420"
        height="420"
        onError={() => setFailed(true)}
        className={`product-photo-image w-full ${className}`}
        style={{ aspectRatio: ratio }}
      />
    );
  }
  return (
    <div className={`product-photo-fallback tint-${product.tint ?? 0} ${className}`} style={{ aspectRatio: ratio }} aria-label={`Image pending for ${product.name}`} />
  );
}
