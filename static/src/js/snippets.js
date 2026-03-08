// @odoo-module ignore

(function () {
    const CAROUSEL_VERSION = "2";
    let visibilityHandlerAttached = false;
    const DEBUG_PREFIX = "[Impact Carousel]";

    function debugLog(...args) {
        console.info(DEBUG_PREFIX, ...args);
    }

    console.info(DEBUG_PREFIX, "script loaded");

    function initImpactBannerCarousel(root = document) {
        const carousels = [...root.querySelectorAll("[data-impact-carousel]")];
        debugLog("scan", { count: carousels.length });

        carousels.forEach((carousel) => {
            if (
                carousel.dataset.impactCarouselReady === "1" &&
                carousel.dataset.impactCarouselVersion === CAROUSEL_VERSION &&
                carousel.impactCarouselControl
            ) {
                debugLog("refresh existing carousel", carousel);
                carousel.impactCarouselControl.refresh();
                carousel.impactCarouselControl.startAutoplay();
                return;
            }

            carousel.dataset.impactCarouselReady = "1";
            carousel.dataset.impactCarouselVersion = CAROUSEL_VERSION;

            const interval = parseInt(carousel.dataset.interval || "5600", 10);
            let currentIndex = 0;
            let timerId = null;

            const getSlides = () => [...carousel.querySelectorAll("[data-impact-slide]")];
            const getDots = () => [...carousel.querySelectorAll("[data-impact-dot]")];
            const resolveCurrentIndex = () => {
                const slides = getSlides();
                const activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
                return activeIndex >= 0 ? activeIndex : 0;
            };

            currentIndex = resolveCurrentIndex();

            debugLog("init", {
                slides: getSlides().length,
                dots: getDots().length,
                interval,
                currentIndex,
                hasPrev: Boolean(carousel.querySelector("[data-impact-prev]")),
                hasNext: Boolean(carousel.querySelector("[data-impact-next]")),
            });

            if (!getSlides().length) {
                console.warn(DEBUG_PREFIX, "no slides found for carousel", carousel);
                return;
            }

            const render = () => {
                const slides = getSlides();
                const dots = getDots();

                slides.forEach((slide, index) => {
                    const isActive = index === currentIndex;
                    slide.classList.toggle("is-active", isActive);
                    slide.setAttribute("aria-hidden", isActive ? "false" : "true");
                });
                dots.forEach((dot, index) => {
                    const isActive = index === currentIndex;
                    dot.classList.toggle("is-active", isActive);
                    dot.setAttribute("aria-current", isActive ? "true" : "false");
                });
                debugLog("render", { currentIndex });
            };

            const stopAutoplay = (reason = "manual") => {
                if (timerId) {
                    window.clearTimeout(timerId);
                    timerId = null;
                    debugLog("stop autoplay", { reason, currentIndex });
                }
            };

            const startAutoplay = () => {
                if (getSlides().length < 2 || document.hidden) {
                    debugLog("autoplay blocked", {
                        slides: getSlides().length,
                        hidden: document.hidden,
                    });
                    return;
                }
                stopAutoplay();
                timerId = window.setTimeout(() => {
                    debugLog("autoplay tick", { from: currentIndex });
                    goTo(currentIndex + 1);
                }, interval);
                debugLog("start autoplay", { interval, currentIndex });
            };

            const goTo = (index) => {
                const slides = getSlides();
                if (!slides.length) {
                    debugLog("goto ignored, no slides");
                    return;
                }
                const previousIndex = currentIndex;
                currentIndex = (index + slides.length) % slides.length;
                debugLog("goto", { previousIndex, nextIndex: currentIndex });
                render();
                startAutoplay();
            };

            const handleArrowClick = (event, nextIndex) => {
                event.preventDefault();
                event.stopPropagation();
                debugLog("arrow click", { nextIndex });
                goTo(nextIndex);
            };

            if (carousel.dataset.impactCarouselDelegated !== "1") {
                carousel.dataset.impactCarouselDelegated = "1";

                carousel.addEventListener("click", (event) => {
                    const prevButton = event.target.closest("[data-impact-prev]");
                    if (prevButton) {
                        handleArrowClick(event, currentIndex - 1);
                        return;
                    }

                    const nextButton = event.target.closest("[data-impact-next]");
                    if (nextButton) {
                        handleArrowClick(event, currentIndex + 1);
                        return;
                    }

                    const dot = event.target.closest("[data-impact-dot]");
                    if (dot) {
                        event.preventDefault();
                        event.stopPropagation();
                        const nextIndex = parseInt(dot.dataset.impactDot || "0", 10);
                        debugLog("dot click", { index: nextIndex });
                        goTo(nextIndex);
                    }
                });

                carousel.addEventListener("mouseover", (event) => {
                    if (event.target.closest("[data-impact-prev], [data-impact-next], [data-impact-dot]")) {
                        stopAutoplay("control hover");
                    }
                });

                carousel.addEventListener("mouseout", (event) => {
                    if (event.target.closest("[data-impact-prev], [data-impact-next], [data-impact-dot]")) {
                        startAutoplay();
                    }
                });

                carousel.addEventListener("focusin", (event) => {
                    if (event.target.closest("[data-impact-prev], [data-impact-next], [data-impact-dot]")) {
                        stopAutoplay("control focus");
                    }
                });

                carousel.addEventListener("focusout", (event) => {
                    if (event.target.closest("[data-impact-prev], [data-impact-next], [data-impact-dot]")) {
                        startAutoplay();
                    }
                });
            }

            carousel.addEventListener("pointerdown", () => stopAutoplay("pointerdown"));
            carousel.addEventListener("touchstart", () => stopAutoplay("touchstart"), { passive: true });
            carousel.addEventListener("touchend", startAutoplay, { passive: true });

            carousel.impactCarouselControl = {
                startAutoplay,
                stopAutoplay,
                refresh: () => {
                    currentIndex = resolveCurrentIndex();
                    debugLog("refresh", { currentIndex, slides: getSlides().length, dots: getDots().length });
                    render();
                },
            };

            if (!visibilityHandlerAttached) {
                document.addEventListener("visibilitychange", () => {
                    document.querySelectorAll("[data-impact-carousel]").forEach((item) => {
                        const control = item.impactCarouselControl;
                        if (!control) {
                            return;
                        }
                        if (document.hidden) {
                            control.stopAutoplay("document hidden");
                        } else {
                            control.startAutoplay();
                        }
                    });
                });
                visibilityHandlerAttached = true;
            }

            render();
            startAutoplay();
        });
    }

    const start = () => {
        if (!document.body) {
            debugLog("start skipped, no body");
            return;
        }
        debugLog("start");
        initImpactBannerCarousel(document);
        window.setTimeout(() => initImpactBannerCarousel(document), 300);
        window.setTimeout(() => initImpactBannerCarousel(document), 1200);
        let mutationFrameRequested = false;
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length) {
                    if (!mutationFrameRequested) {
                        mutationFrameRequested = true;
                        debugLog("mutation detected, re-scan");
                        window.requestAnimationFrame(() => {
                            mutationFrameRequested = false;
                            initImpactBannerCarousel(document);
                        });
                    }
                    break;
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        debugLog("observer attached");
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start, { once: true });
    } else {
        start();
    }

    window.addEventListener("load", start, { once: true });
    window.addEventListener("pageshow", start, { once: true });
    window.initImpactBannerCarousel = initImpactBannerCarousel;
})();
