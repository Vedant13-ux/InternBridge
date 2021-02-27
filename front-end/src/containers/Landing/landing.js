import React from "react";
import Login from "./Login";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <html lang="en">
        <head>
          <title>InternBridge</title>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
          <meta name="description" content="" />
          <meta name="keywords" content="" />
          <meta name="author" content="" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />

          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
            crossorigin="anonymous"
          />
          <link rel="stylesheet" href="/landing/css/font-awesome.min.css" />
          <link rel="stylesheet" href="/landing/css/owl.carousel.min.css" />
          <link
            rel="stylesheet"
            href="/landing/css/owl.theme.default.min.css"
          />

          <link rel="stylesheet" href="/landing/css/main.css" />
        </head>
        <body>
          <nav class="navbar navbar-expand-lg">
            <div class="container">
              <a class="navbar-brand" href="index.html">
                <i class="fa fa-line-chart"></i>
                InternBridge
              </a>

              {/* <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button> */}

              <div id="navbarNav">
                <ul class="navbar-nav ml-auto">
                  {/* <li class="nav-item">
                    <a href="#about" class="nav-link smoothScroll">
                      Studio
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#project" class="nav-link smoothScroll">
                      Our Works
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="blog.html" class="nav-link">
                      Blog
                    </a>
                  </li> */}
                  <li class="nav-item">
                    <a href="contact.html" class="nav-link contact">
                      Login
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="contact.html" class="nav-link contact">
                      Register
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <section class="hero-bg d-flex justify-content-center align-items-center">
            <div class="container">
              <div class="row">
                <div class="col-lg-6 col-md-10 col-12 d-flex flex-column justify-content-center align-items-center">
                  <div class="hero-text">
                    <h1 class="text-white" data-aos="fade-up">
                      Never miss an Internship Opportunty.
                    </h1>

                    <a
                      href="contact.html"
                      class="custom-btn btn-bg btn mt-3"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      Explore now
                    </a>
                  </div>
                </div>

                <div class="col-lg-6 col-12">
                  <div
                    class="hero-image"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <img
                      src="images/working-girl.png"
                      class="img-fluid"
                      alt="working girl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="about section-padding pb-0" id="about">
            <div class="container">
              <div class="row">
                <div class="col-lg-7 mx-auto col-md-10 col-12">
                  <div class="about-info">
                    <h2 class="mb-4" data-aos="fade-up">
                      {/* the best <strong>Digital Marketing agency</strong> in Rio
                      de Janeiro */}
                      <strong>InternBridge</strong> is here to centralize all
                      the internship related activities of your college!
                    </h2>

                    <p class="mb-0" data-aos="fade-up">
                      How many times has it happened that you missed the
                      internship application date just because you missed to see
                      that application mail due to tons of other not so
                      important mails of your college.
                    </p>
                  </div>

                  <div
                    class="about-image"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <img
                      src="images/office.png"
                      class="img-fluid"
                      alt="office"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer class="site-footer">
            <div class="container">
              <div class="row">
                <div class="col-lg-5 mx-lg-auto col-md-8 col-10">
                  <h1
                    class="text-white"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <strong>Every Internship</strong> at one common place
                  </h1>
                </div>

                <div
                  class="col-lg-3 col-md-6 col-12"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <p style={{ color: "white", padding: "1rem 0rem" }}>
                    Subscribe to our mail to always be updated with our latest
                    features
                  </p>
                  <p>dummy@dummy.com</p>
                </div>
              </div>
            </div>
          </footer>

          <script src="js/jquery.min.js"></script>
          <script src="js/aos.js"></script>
          <script src="js/owl.carousel.min.js"></script>
          <script src="js/smoothscroll.js"></script>
          <script src="js/custom.js"></script>
        </body>
      </html>
    </div>
  );
};

export default LandingPage;
