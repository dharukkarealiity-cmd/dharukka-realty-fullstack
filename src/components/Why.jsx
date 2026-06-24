import { useEffect, useRef } from "react";
import "./Why.css";

import {
  FaBuilding,
  FaFileContract,
  FaClock,
  FaGem,
  FaUsers,
  FaHeart,
  FaChartLine,
} from "react-icons/fa";

const reasons = [
  {
    title: "Superior Construction Quality",
    desc: "Built with trusted materials and expert workmanship.",
    icon: <FaBuilding />,
    iconBg: "#FFF8E6",
iconColor: "#C89B3C",
  },
  {
    title: "Transparent Process",
    desc: "Clear communication and honest pricing.",
    icon: <FaFileContract />,
    iconBg: "#FFF8E6",
iconColor: "#C89B3C",
  },
  {
    title: "Timely Delivery",
    desc: "Projects completed on schedule.",
    icon: <FaClock />,
    iconBg: "#FFF8E6",
iconColor: "#C89B3C",
  },
  {
    title: "Premium Materials",
    desc: "Only the highest-quality materials.",
    icon: <FaGem />,
    iconBg: "#FFF8E6",
    iconColor: "#C89B3C",
  },
  {
    title: "Expert Team",
    desc: "Experienced architects and engineers.",
    icon: <FaUsers />,
    iconBg: "#FFF8E6",
    iconColor: "#C89B3C",
  },
  {
    title: "Customer Satisfaction",
    desc: "Long-term trust and support.",
    icon: <FaHeart />,
    iconBg: "#FFF8E6",
iconColor: "#C89B3C",
  },
  {
    title: "Long-Term Value",
    desc: "Built for generations.",
    icon: <FaChartLine />,
    iconBg: "#FFF8E6",
    iconColor: "#C89B3C",
  },
];

function Why() {
  const scrollRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId;
    const speed = 0.6;

    const step = () => {
      if (!isPaused.current) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    const pause = () => { isPaused.current = true; };
    const resume = () => { isPaused.current = false; };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  const allCards = [...reasons, ...reasons];

  return (
    <section className="why-section">
      <div className="why-header">
        <p className="why-label">WHY DHARUKKA</p>
        <h2 className="why-headline">
          Seven reasons families choose us,<br />
          generation after generation.
        </h2>
      </div>

      <div className="why-scroll-wrapper">
        <div className="why-scroll" ref={scrollRef}>
          {allCards.map((item, i) => (
            <div className="why-card" key={i}>
              <div className="why-card-top">
                
                <div
  className="why-icon"
  style={{
    background: item.iconBg,
    color: item.iconColor,
    fontSize: "30px"
  }}
>
  {item.icon}
</div>
              </div>
              <div className="why-bar" />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="why-fade why-fade--left" />
        <div className="why-fade why-fade--right" />
      </div>
    </section>
  );
}

export default Why;