import React, { useState } from "react";

// Product photos are local WebP assets configured in src/data/products.json.
// A graceful placeholder remains available if a client removes or renames an image.
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
    <div className={`product-photo-fallback tint-${product.tint ?? 0} grid place-items-center ${className}`} style={{ aspectRatio: ratio }} role="img" aria-label={product.name}>
      <span className="font-display text-4xl font-bold opacity-40">{product.name.charAt(0)}</span>
    </div>
  );
}
