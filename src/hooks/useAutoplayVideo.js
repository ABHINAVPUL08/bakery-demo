import { useEffect, useRef } from "react";

/**
 * Keeps background videos playing on mobile (muted + inline) with fallbacks
 * for iOS Safari and Low Power Mode edge cases.
 */
export function useAutoplayVideo({ threshold = 0.12, pauseWhenOffscreen = true } = {}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    };

    const onReady = () => tryPlay();
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);

    tryPlay();

    const unlockOnInteraction = () => tryPlay();
    document.addEventListener("touchstart", unlockOnInteraction, { once: true, passive: true });
    document.addEventListener("click", unlockOnInteraction, { once: true });

    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        tryPlay();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    let observer;
    if (pauseWhenOffscreen) {
      const watchTarget =
        video.closest(".hero, .story-media, .order-form-area, section") || video.parentElement || video;

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !document.hidden) {
            tryPlay();
          } else {
            video.pause();
          }
        },
        { threshold }
      );
      observer.observe(watchTarget);
    }

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      document.removeEventListener("touchstart", unlockOnInteraction);
      document.removeEventListener("click", unlockOnInteraction);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer?.disconnect();
    };
  }, [threshold, pauseWhenOffscreen]);

  return videoRef;
}
