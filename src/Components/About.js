import RouteTransition from "./RouteTransition";


const About = () => {

  return (
    <div>

   
      <RouteTransition>
        <div className="content-box">
          <div className="title-box"><h1>About Us</h1></div>
          <p>
            <strong>Cyber Security Solutions (CSS)</strong> was founded by <strong>Ethan Miller</strong> with a mission to help organizations
            of all sizes defend against modern cyber threats.
          </p>
          <p>
            With years of hands-on experience in penetration testing, incident
            response, and security consulting, Ethan leads a team of passionate
            experts dedicated to protecting your data and digital
            infrastructure.
          </p>
          <p>
            At CSS, we believe in a proactive approach to security. We work
            closely with our clients to understand their unique needs and
            deliver tailored solutions that ensure peace of mind in an
            ever-evolving digital landscape.
          </p>
          <p>
            Whether you need vulnerability assessments, security awareness
            training, or help responding to an incident, our team is here to
            support you every step of the way.
          </p>
          <div className="quote-box">
            <p>
              "Security is not a product, but a process. Our goal is to empower
              you to operate safely and confidently."
            </p>
            <br />
            <strong>–</strong> <span>Ethan Miller</span>, Founder
          </div>
        </div>
      </RouteTransition>
    </div>
  );
};

export default About;
