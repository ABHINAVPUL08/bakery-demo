import { useEffect, useMemo, useRef, useState } from "react";
import OrderSection from "./components/OrderSection";
import "./App.css";

const carouselSlides = [
  {
    image: "/images/specialties-hero.png",
    position: "72% center",
    text: "Decadent treats and savoury eats - our passion for food is flavourful.",
  },
  {
    image: "/images/carousel-bread.png",
    position: "center center",
    text: "Homemade bread baked fresh, each and every day.",
  },
  {
    image: "/images/carousel-blueberry.png",
    position: "center center",
    text: "Crumbly, crispy, glazed, and drizzled.",
  },
];

const specialties = [
  { label: "Sourdough and specialty bread", image: "/images/bread.jpg" },
  { label: "Fresh and pressed sandwiches", image: "/images/pressed-sandwiches.jpg" },
  { label: "Tarts", image: "/images/tarts.jpg" },
  { label: "Quiche", image: "/images/quiche.jpg" },
  { label: "Cookies", image: "/images/cookies.jpg" },
  { label: "Cakes", image: "/images/cakes.jpg" },
  { label: "Scones", image: "/images/biscuits.jpg" },
  { label: "Sticky buns", image: "/images/sticky-buns.jpg" },
  { label: "Empanadas", image: "/images/empanadas.jpg" },
  { label: "Specialty Croissants", image: "/images/croissants.jpg" },
  { label: "Specialty Coffee", image: "/images/coffee.jpg" },
  { label: "Fresh-baked Pies", image: "/images/pies.jpg" },
];

const cakeCategories = [
  {
    icon: "🍰",
    title: "Signature Cakes",
    subtitle: "Our handcrafted bakery favourites, baked fresh every day.",
    cakes: ["Classic Carrot Cake", "Banana Toffee Cake", "Salted Caramel Fudge Cake"],
    footer: 'Available in 6" & 9" sizes',
    button: "View Signature Cakes →",
    href: "#order",
  },
  {
    icon: "🍫",
    title: "Chocolate Collection",
    subtitle: "Rich, indulgent chocolate creations made with premium cocoa.",
    cakes: ["Chocolate Mocha Fudge", "Chocolate Oblivion (Gluten Friendly)"],
    footer: 'Available in 6" & 9" sizes',
    button: "Explore Chocolate Cakes →",
    href: "#order",
  },
  {
    icon: "🍓",
    title: "Cheesecake Collection",
    subtitle: "Creamy, smooth cheesecakes crafted with fresh ingredients.",
    cakes: [
      "Turtle Cheesecake",
      "Strawberry Cheesecake",
      "Blueberry Cheesecake",
      "Lotus Biscoff Cheesecake",
    ],
    footer: 'Available in 6" & 9" sizes',
    button: "Browse Cheesecakes →",
    href: "#order",
  },
];

const pieSelection = [
  "Apple ₹1,900",
  "Blueberry ₹1,950",
  "Strawberry Rhubarb ₹1,950",
  "Key Lime ₹2,250",
  "Large Sugar Pie ₹2,650",
  "Seasonal Pies - call the bakery for details",
];

function handleSpecialtyEnter(event) {
  const video = event.currentTarget.querySelector("video");
  if (!video) return;
  if (video.dataset.src && !video.getAttribute("src")) {
    video.src = video.dataset.src;
  }
  video.play().catch(() => {});
}

function handleSpecialtyLeave(event) {
  const video = event.currentTarget.querySelector("video");
  if (!video) return;
  video.pause();
  video.currentTime = 0;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const heroVideoRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!carouselVisible) return undefined;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [carouselVisible]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setCarouselVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    const hero = document.querySelector(".hero");
    if (!video || !hero) return undefined;

    const playHeroVideo = () => {
      video.play().catch(() => {});
    };

    const pauseHeroVideo = () => {
      video.pause();
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          playHeroVideo();
        } else {
          pauseHeroVideo();
        }
      },
      { threshold: 0.15 }
    );

    const onVisibilityChange = () => {
      if (document.hidden) {
        pauseHeroVideo();
      } else if (hero.getBoundingClientRect().bottom > 0) {
        playHeroVideo();
      }
    };

    heroObserver.observe(hero);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      heroObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealNodes = document.querySelectorAll("[data-reveal]");
    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const navLinks = useMemo(
    () => [
      { href: "#about", label: "About" },
      { href: "#cakes", label: "Cakes" },
      { href: "#specialties", label: "Specialties" },
      { href: "#story", label: "Our Story" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  function showNextSlide() {
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
  }

  function showPrevSlide() {
    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  }

  return (
    <div className="site">
      <header className="topbar">
        <div className="container row topbar-row">
          <div className="top-actions">
            <a href="#contact">Hours of operation</a>
            <a href="#order">
              Order Online
            </a>
          </div>
        </div>
      </header>

      <nav className="mainnav">
        <div className="container row">
          <a href="#" className="brand">
            <img src="/images/logo.svg" alt="YOURS CAFE logo" />
          </a>
          <button
            className={`hamburger ${menuOpen ? "is-active" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={`menu-overlay ${menuOpen ? "open" : ""}`}>
          <div className="menu-overlay-inner">
            <ul className="overlay-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#" className="overlay-logo" onClick={() => setMenuOpen(false)}>
              <img src="/images/logo.svg" alt="YOURS CAFE logo" />
            </a>
            <button
              className="overlay-close"
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-bg" />
        <video
          ref={heroVideoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          src="/videos/baker-flour.mp4"
        />
        <img className="hero-sunburst" src="/images/sunrise.svg" alt="" aria-hidden="true" />
        <div className="container hero-content">
          <div data-reveal className="hero-left">
            <div className="line" />
            <h1>BAKED WITH HEART. SHARED WITH LOVE.</h1>
          </div>
          <div data-reveal className="hero-right">
            <div className="vert-line" />
            <p>Where handcrafted recipes become unforgettable moments.</p>
          </div>
        </div>
      </section>

      <section id="about" className="hours-feature">
        <img
          src="/images/hours-operation.png"
          alt="Hours of Operation at YOURS CAFE"
          loading="lazy"
          decoding="async"
        />
      </section>

      <section className="about-section">
        <div className="container about-grid">
          <div data-reveal className="about-copy">
            <div className="about-copy-inner">
              <img src="/images/cross.svg" alt="" aria-hidden="true" className="about-cross" />
              <p>
                YOURS CAFE is a fresh-from-the-oven food experience in Sudbury's South End.
                We blend the most delectable elements of rustic French baking with local,
                seasonal ingredients, and create every dish by hand, with love.
              </p>
            </div>
            <span className="about-line line-left" />
            <span className="about-line line-bottom" />
          </div>
          <div data-reveal className="about-photo">
            <img
              src="/images/about-baking.png"
              alt="Baker dusting flour over fresh bread in a warm kitchen"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section id="cakes" className="cakes">
        <div className="container">
          <div className="cakes-desc" data-reveal>
            <h2>HANDCRAFTED CAKES FOR LIFE&apos;S SWEETEST MOMENTS</h2>
            <p>
              Celebrate birthdays, anniversaries, weddings, graduations, and every milestone with
              a cake baked fresh just for you.
            </p>
            <p>
              Every cake is handcrafted daily using premium ingredients, real butter, rich chocolate,
              fresh cream, and timeless recipes to create unforgettable flavors and stunning
              presentation.
            </p>
            <h3 className="cakes-size-heading">Choose Your Size</h3>
            <ul className="cakes-sizes">
              <li>🎂 6&quot; — Perfect for 6–8 guests</li>
              <li>🎂 9&quot; — Serves 10–16 guests</li>
            </ul>
            <p className="cakes-advance-note">
              ✨ Please order at least 48 hours in advance so we can bake your cake fresh and make
              your celebration truly special.
            </p>
            <p className="cakes-badges">
              Fresh Ingredients • Handmade Daily • Beautifully Crafted
            </p>
            <a className="cakes-order-link" href="#order">
              &gt; Order a cake
            </a>
          </div>

          <div className="cake-categories" data-reveal>
            <h2 className="cakes-selection-title">CAKE SELECTION</h2>
            <div className="cake-categories-grid">
              {cakeCategories.map((category) => (
                <article key={category.title} className="cake-category-card">
                  <span className="cake-category-card__icon" aria-hidden="true">
                    {category.icon}
                  </span>
                  <h3 className="cake-category-card__title">{category.title}</h3>
                  <p className="cake-category-card__subtitle">{category.subtitle}</p>
                  <ul className="cake-category-card__list">
                    {category.cakes.map((cake) => (
                      <li key={cake}>{cake}</li>
                    ))}
                  </ul>
                  <p className="cake-category-card__footer">{category.footer}</p>
                  <a href={category.href} className="cake-category-card__btn">
                    {category.button}
                  </a>
                </article>
              ))}
            </div>
          </div>

          <div className="cake-grid">
            <figure
              data-reveal
              className="cake-hover-card"
              onMouseEnter={handleSpecialtyEnter}
              onMouseLeave={handleSpecialtyLeave}
            >
              <div className="cake-image--hover-video">
                <img src="/images/cakes/banana-toffee-cover.png" alt="Banana Toffee Caramel Cake" loading="lazy" decoding="async" />
                <video
                  className="card-hover-video"
                  muted
                  loop
                  playsInline
                  preload="none"
                  data-src="/videos/banana-toffee-hover.mp4"
                />
              </div>
              <figcaption className="cake-caption">
                <span>Banana Toffee Caramel Cake</span>
              </figcaption>
            </figure>
            <figure
              data-reveal
              className="cake-hover-card"
              onMouseEnter={handleSpecialtyEnter}
              onMouseLeave={handleSpecialtyLeave}
            >
              <div className="cake-image--hover-video">
                <img src="/images/cakes/salted-caramel-cover.png" alt="Rich Chocolate Sponge Cake" loading="lazy" decoding="async" />
                <video
                  className="card-hover-video"
                  muted
                  loop
                  playsInline
                  preload="none"
                  data-src="/videos/salted-caramel-hover.mp4"
                />
              </div>
              <figcaption className="cake-caption">
                <span>Rich Chocolate Sponge Cake</span>
              </figcaption>
            </figure>
            <figure
              data-reveal
              className="cake-hover-card"
              onMouseEnter={handleSpecialtyEnter}
              onMouseLeave={handleSpecialtyLeave}
            >
              <div className="cake-image--hover-video">
                <img
                  src="/images/cakes/carrot-cake-cover.png"
                  alt="Brown Butter Cream Cheese Frosting Cake"
                  loading="lazy"
                  decoding="async"
                />
                <video
                  className="card-hover-video"
                  muted
                  loop
                  playsInline
                  preload="none"
                  data-src="/videos/carrot-cake-hover.mp4"
                />
              </div>
              <figcaption className="cake-caption">
                <span>Brown Butter Cream Cheese Frosting Cake</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="pies" className="pies-section">
        <div className="container">
          <h2 className="cakes-selection-title" data-reveal>
            PIE SELECTION
          </h2>
          <ul className="cakes-price-list" data-reveal>
            {pieSelection.map((pie) => (
              <li key={pie}>{pie}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="catering-section">
        <div className="container catering-grid">
          <div className="catering-image-wrap">
            <img
              src="/images/catering-platter.png"
              alt="Artisan catering platter with sandwiches, sliders, and canapés"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div data-reveal className="catering-copy">
            <h2>CATERING</h2>
            <p>
              Serve a fresh-from-the-oven food experience for your special occasion. We offer
              homemade, baked goods using fresh, local, seasonal ingredients.
            </p>
            <a href="#order">&gt; Catered breakfast menu</a>
            <a href="#order">&gt; Catered lunch menu</a>
            <a href="#order">&gt; Place catering order</a>
          </div>
        </div>
        <div className="container gift-boxes" data-reveal>
          <img src="/images/gift-basket.svg" alt="Gift basket" loading="lazy" decoding="async" />
          <h2>GIFT BOXES</h2>
          <p>
            Thoughtfully curated gift boxes, baked fresh and beautifully packaged — the perfect
            way to celebrate, thank someone special, or simply share the warmth of YOURS CAFE.
          </p>
          <div className="gift-grid">
            <p>
              <strong>The Companion Box&nbsp;&nbsp;₹3,499 + GST</strong>
              <br />
              A charming everyday luxury — ideal for housewarmings, thank-yous, or cozy evenings
              in. Artisan sourdough, butter tart stuffed cookies, chef&apos;s selection cookies,
              cranberry–fig jam, house apple butter, whipped compound butter, artisan crisps
              with beer cheese, and rich fudgy brownies.
            </p>
            <p>
              <strong>The Brunch Box&nbsp;&nbsp;₹3,499 + GST</strong>
              <br />
              Turn any morning into a celebration. Chocolate, almond & butter croissants, fresh-baked
              scones, house granola, breakfast cookies, compound butter, seasonal housemade jam,
              and ½ lb freshly ground coffee or whole espresso beans.
            </p>
          </div>
          <p className="gift-third">
            <strong>City of Lakes Celebration Box&nbsp;&nbsp;₹4,999 + GST</strong>
            <br />
            Our grandest gift — a show-stopping spread for birthdays, milestones, and every moment
            worth remembering. Sourdough, scones, chocolate & almond croissants, butter tart
            cookies, ginger molasses cookies, crinkle cookies, butter tarts, granola, brownies,
            housemade jam, Nordic crisps, and ½ lb espresso beans or ground coffee.
          </p>
          <a className="cakes-order-link" href="#order">
            &gt; Order gift box
          </a>
          <div className="gift-box-media-row">
            <div
              className="gift-box-video-wrap cake-hover-card"
              onMouseEnter={handleSpecialtyEnter}
              onMouseLeave={handleSpecialtyLeave}
            >
              <div className="cake-image--hover-video gift-box-video-frame">
                <img src="/images/gift-box-cover.png" alt="Gift box with gold ribbon" />
                <video
                  className="card-hover-video"
                  muted
                  loop
                  playsInline
                  preload="none"
                  data-src="/videos/gift-box-rise.mp4"
                />
              </div>
            </div>
            <div
              className="gift-box-video-wrap cake-hover-card"
              onMouseEnter={handleSpecialtyEnter}
              onMouseLeave={handleSpecialtyLeave}
            >
              <div className="cake-image--hover-video gift-box-video-frame">
                <img src="/images/coffee-gift-box-cover.png" alt="Coffee gift box with croissant and cookies" />
                <video
                  className="card-hover-video"
                  muted
                  loop
                  playsInline
                  preload="none"
                  data-src="/videos/coffee-gift-box.mp4"
                />
              </div>
            </div>
            <div
              className="gift-box-video-wrap cake-hover-card"
              onMouseEnter={handleSpecialtyEnter}
              onMouseLeave={handleSpecialtyLeave}
            >
              <div className="cake-image--hover-video gift-box-video-frame">
                <img src="/images/bakery-gift-box-cover.png" alt="Bakery gift box with floating desserts" />
                <video
                  className="card-hover-video"
                  muted
                  loop
                  playsInline
                  preload="none"
                  data-src="/videos/bakery-gift-box-desserts.mp4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <OrderSection />

      <section ref={carouselRef} className="carousel" id="carousel">
        {carouselSlides.map((slide, index) => (
          <article
            key={slide.image}
            className={`slide ${index === activeSlide ? "active" : ""}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: slide.position || "center",
            }}
          >
            <p>{slide.text}</p>
          </article>
        ))}
        <button className="carousel-nav prev" type="button" onClick={showPrevSlide} aria-label="Previous slide">
          ‹
        </button>
        <button className="carousel-nav next" type="button" onClick={showNextSlide} aria-label="Next slide">
          ›
        </button>
      </section>

      <section id="specialties" className="specialties">
        <h2 className="specialties-heading">OUR SPECIALTIES</h2>
        <div className="container specialties-shell">
          <div className="specialty-rows">
            <div className="specialty-row">
              <article
                data-reveal
                className="specialty-card narrow specialty-hover-card"
                onMouseEnter={handleSpecialtyEnter}
                onMouseLeave={handleSpecialtyLeave}
              >
                <div
                  className="card-image card-image--hover-video"
                  style={{ backgroundImage: `url(${specialties[0].image})` }}
                >
                  <video
                    className="card-hover-video"
                    muted
                    loop
                    playsInline
                    preload="none"
                    data-src="/videos/sourdough-hover.mp4"
                  />
                </div>
                <p>{specialties[0].label}</p>
              </article>
              <article
                data-reveal
                className="specialty-card wide specialty-hover-card"
                onMouseEnter={handleSpecialtyEnter}
                onMouseLeave={handleSpecialtyLeave}
              >
                <div
                  className="card-image card-image--hover-video"
                  style={{ backgroundImage: `url(${specialties[1].image})` }}
                >
                  <video
                    className="card-hover-video"
                    muted
                    loop
                    playsInline
                    preload="none"
                    data-src="/videos/sandwich-assembly.mp4"
                  />
                </div>
                <p>{specialties[1].label}</p>
              </article>
            </div>
            <div className="specialty-row">
              <article data-reveal className="specialty-card wide">
                <div className="card-image" style={{ backgroundImage: `url(${specialties[2].image})` }} />
                <p>{specialties[2].label}</p>
              </article>
              <article
                data-reveal
                className="specialty-card narrow specialty-hover-card"
                onMouseEnter={handleSpecialtyEnter}
                onMouseLeave={handleSpecialtyLeave}
              >
                <div
                  className="card-image card-image--hover-video"
                  style={{ backgroundImage: `url(${specialties[3].image})` }}
                >
                  <video
                    className="card-hover-video"
                    muted
                    loop
                    playsInline
                    preload="none"
                    data-src="/videos/sourdough-bread.mp4"
                  />
                </div>
                <p>{specialties[3].label}</p>
              </article>
            </div>
            <div className="specialty-row">
              <article data-reveal className="specialty-card narrow">
                <div className="card-image" style={{ backgroundImage: `url(${specialties[4].image})` }} />
                <p>{specialties[4].label}</p>
              </article>
              <article
                data-reveal
                className="specialty-card wide specialty-hover-card"
                onMouseEnter={handleSpecialtyEnter}
                onMouseLeave={handleSpecialtyLeave}
              >
                <div
                  className="card-image card-image--hover-video"
                  style={{ backgroundImage: `url(${specialties[5].image})` }}
                >
                  <video
                    className="card-hover-video"
                    muted
                    loop
                    playsInline
                    preload="none"
                    data-src="/videos/cake-drip-hover.mp4"
                  />
                </div>
                <p>{specialties[5].label}</p>
              </article>
            </div>
            <div className="specialty-row">
              <article data-reveal className="specialty-card wide">
                <div className="card-image" style={{ backgroundImage: `url(${specialties[6].image})` }} />
                <p>{specialties[6].label}</p>
              </article>
              <article data-reveal className="specialty-card narrow">
                <div className="card-image" style={{ backgroundImage: `url(${specialties[7].image})` }} />
                <p>{specialties[7].label}</p>
              </article>
            </div>
            <div className="specialty-row">
              <article data-reveal className="specialty-card narrow">
                <div className="card-image" style={{ backgroundImage: `url(${specialties[8].image})` }} />
                <p>{specialties[8].label}</p>
              </article>
              <article data-reveal className="specialty-card wide">
                <div className="card-image" style={{ backgroundImage: `url(${specialties[9].image})` }} />
                <p>{specialties[9].label}</p>
              </article>
            </div>
            <div className="specialty-row">
              <article data-reveal className="specialty-card wide">
                <div className="card-image" style={{ backgroundImage: `url(${specialties[10].image})` }} />
                <p>{specialties[10].label}</p>
              </article>
              <article data-reveal className="specialty-card narrow">
                <div className="card-image" style={{ backgroundImage: `url(${specialties[11].image})` }} />
                <p>{specialties[11].label}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="social" id="social">
        <div className="container">
          <div className="social-callout-box" data-reveal>
            <p>
              Our selection changes seasonally, <strong>make sure you visit often!</strong>
            </p>
          </div>
          <div className="social-follow" data-reveal>
            <h3>NOW SERVING FRESH UPDATES</h3>
            <p>
              <strong>Follow us</strong> to add a pinch of delicious to your day.
            </p>
            <div className="social-links-row">
              <a href="#social">
                Facebook
              </a>
              <span>|</span>
              <a href="#social">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="our-story" id="story">
        <div className="our-story-grid">
          <div className="story-text">
            <h1 data-reveal>Simple ingredients.</h1>
            <p className="story-lead" data-reveal>Traditional techniques.</p>
            <p className="story-lead" data-reveal>Exceptional taste.</p>
            <p className="story-body" data-reveal>
              Every loaf, cake, and pastry is baked fresh daily to bring warmth, comfort, and
              unforgettable flavor to every occasion.
            </p>
            <p className="story-badges" data-reveal>
              Fresh Every Day • Handmade • Premium Ingredients
            </p>
            <span className="story-line story-line-vertical" aria-hidden="true" />
            <span className="story-line story-line-horizontal" aria-hidden="true" />
          </div>
          <div className="story-media">
            <video
              className="story-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Artisan baker scoring dough"
            >
              <source src="/videos/story-baking.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container contact-grid">
          <div className="contact-col">
            <h6>Contact</h6>
          </div>
          <div className="contact-col">
            <h6>Address</h6>
          </div>
          <div className="contact-col">
            <h6>Hours of Operation</h6>
          </div>
          <div className="contact-col">
            <h6>Follow</h6>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-brand">
          <a href="#" className="footer-logo">
            <img src="/images/logo.svg" alt="YOURS CAFE logo" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
