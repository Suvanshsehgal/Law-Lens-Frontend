import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Preloader = ({ show }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      // Delay unmount to allow fade-out animation
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        transition-opacity duration-300 ease-in-out
        ${show ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="w-44 h-44">
        <DotLottieReact
          src="https://lottie.host/86f28af7-abaa-493c-a5a4-0beb323a9b84/9yayhlYQis.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default Preloader;
