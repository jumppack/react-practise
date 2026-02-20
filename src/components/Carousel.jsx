import { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ url, limit = 10 }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        // Append limit if not already in URL (simplified check)
        const fetchUrl = url.includes('?') ? `${url}&limit=${limit}` : `${url}?limit=${limit}`;
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [url, limit]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (loading) return <div className="carousel-loading">Loading...</div>;
  if (error) return <div className="carousel-error">Error: {error}</div>;
  if (images.length === 0) return <div className="carousel-empty">No images found.</div>;

  return (
    <div className="carousel-container">
      <button onClick={handlePrev} className="carousel-btn prev-btn" aria-label="Previous Image Button">
        &lt;
      </button>
      <div className="carousel-content">
        <img
          src={images[currentIndex].download_url}
          alt={`Taken by ${images[currentIndex].author}`}
          className="carousel-image"
        />
        <div className="carousel-caption">
             <span>{images[currentIndex].author}</span>
             <span className="carousel-indicator">{currentIndex + 1} / {images.length}</span>
        </div>
      </div>
      <button onClick={handleNext} className="carousel-btn next-btn" aria-label="Next Image">
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
