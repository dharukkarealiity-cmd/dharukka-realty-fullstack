import { useEffect, useState } from "react";
import "./Gallery.css";

const BASE = "https://dharukka-realty-fullstack-oh3s.onrender.com";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${BASE}/api/gallery`)
      .then((r) => r.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, []);

  if (images.length === 0) return null;

  return (
    <section className="gallery-section">
      <div className="gallery-inner">
        <p className="gallery-label">OUR WORK</p>
        <h2 className="gallery-title">
          A glimpse of <span>our projects</span>
        </h2>
        <div className="gallery-grid">
          {images.map((img) => (
            <div className="gallery-item" key={img._id}>
              <img src={img.url} alt={img.caption || "Gallery"} />
              {img.caption && <p className="gallery-caption">{img.caption}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;