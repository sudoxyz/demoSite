import RouteTransition from "./RouteTransition";

const Home = () => {
  return (
    <div>
      <RouteTransition>
        <div className="content-box">
          <div className="title-box">
            <h1>Welcome</h1>
          </div>
          <div className="content-box">
            <h2>Why Choose Us?</h2>
            <ul>
              <li>
                Proven track record with clients across multiple industries
              </li>
              <li>Cutting-edge tools and methodologies</li>
              <li>24/7 support and rapid response times</li>
              <li>Customizable solutions for businesses of all sizes</li>
            </ul>
          </div>
          <div className="content-box">
            <h2>About Cyber Security Solutions</h2>
            <p>
              Explore our solutions and learn more about how we can help secure
              your digital assets.
            </p>
            <p>
              <strong>Cyber Security Solutions (CSS)</strong> is your trusted
              partner in protecting your business from evolving cyber threats.
              We offer a comprehensive suite of services, including:
            </p>
            <ul>
              <li>Penetration Testing & Vulnerability Assessments</li>
              <li>Security Awareness Training</li>
              <li>Incident Response & Recovery</li>
              <li>Cloud Security Consulting</li>
              <li>Compliance & Risk Management</li>
            </ul>
            <p>
              Our team of certified experts is dedicated to keeping your data
              safe and your operations running smoothly. Whether you're a small
              business or a large enterprise, we tailor our solutions to fit
              your unique needs.
            </p>
          </div>

          <div className="content-box">
            <h3>Get Started Today</h3>
            <p>
              Ready to strengthen your security posture? Contact us for a free
              consultation or to request a quote. Let us help you stay ahead of
              cyber threats and safeguard your business.
            </p>
          </div>
        </div>
      </RouteTransition>
    </div>
  );
};

export default Home;
