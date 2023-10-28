import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import "./Carousel.css";

type CarouselProps = {
  children?: ReactNode;
  carouselClass?: string;
};

const Carousel: React.FC<CarouselProps> = ({
  children,
  carouselClass,
}: React.PropsWithChildren<CarouselProps>) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScrollTo = useCallback(
    (direction: number) => () => {
      if (carouselRef.current && !isScrolling) {
        setIsScrolling(true); // Set scrolling to in progress
        const cardWidth = firstCardRef.current
          ? firstCardRef.current.getBoundingClientRect().width + 24
          : 0;
        const currentScrollLeft = carouselRef.current.scrollLeft;
        const nextScrollLeft = currentScrollLeft + direction * cardWidth;

        carouselRef.current.scrollTo({
          left: nextScrollLeft,
          behavior: "smooth",
        });

        // After the animation duration, set scrolling to complete
        setTimeout(() => {
          setIsScrolling(false);
        }, 300); // You can adjust the duration to match your animation duration
      }
    },
    [carouselRef, firstCardRef, isScrolling]
  );

  // Add a useEffect to listen for wheel events
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        handleScrollTo(1)(); // Scroll down, move to the next card
      } else if (event.deltaY < 0) {
        handleScrollTo(-1)(); // Scroll up, move to the previous card
      }
    };

    const currentCarouselRef = carouselRef.current; // Store the current value

    currentCarouselRef?.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      currentCarouselRef?.removeEventListener("wheel", handleWheel);
    };
  }, [handleScrollTo, carouselRef]);

  return (
    <div className={`carousel-container ${carouselClass}`}>
      <div>
        <button onClick={handleScrollTo(-1)}>Left</button>
        <button onClick={handleScrollTo(1)}>Right</button>
      </div>
      <section className="carousel" ref={carouselRef}>
        <div>
          <article></article>
          {React.Children.map(children, (child, index) => {
            if (index === 1) {
              return React.cloneElement(child as React.ReactElement, {
                ref: firstCardRef,
              });
            }
            return child;
          })}
        </div>
      </section>
    </div>
  );
};

export default Carousel;
