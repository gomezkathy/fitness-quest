import "../App.css";
console.log("API Host:", process.env.REACT_APP_API_HOST);

export default function Home() {
  return (
    <div>
      <div className="hero-image">
        <div className="hero-text">
          <h1>Track your workouts</h1>
          <p>We got you covered</p>
          <a href="/accounts/signup">
            <button className="hero-button mt-1 mb-3">Sign Up</button>
          </a>
          <p>
            Already a member?{" "}
            <a className="login-link" href="/accounts/login">
              Log In
            </a>{" "}
          </p>
        </div>
      </div>
      <div className="features">
        <div className="home-page-text">
          <h2>Fitness Quest is free, easy, convinient</h2>
          <p>Plan your workouts, track your goals, feel your best</p>
        </div>
        <div>
          <img
            src="https://images.pexels.com/photos/4162583/pexels-photo-4162583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="App Demo"
          />
        </div>
      </div>
      <div className="who-are-we">
        <div>
          <img
            src="https://images.pexels.com/photos/4793231/pexels-photo-4793231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Gym Background"
          />
        </div>
        <div className="home-page-text">
          <h2>Who Are We?</h2>
          <p>
            We're a team of health and fitness enthusiasts on a mission
            revolutionize people's lives. While taking care of your health is a
            significant endeavor, we believe it shouldn't always be a challenge.
            We're firm believers in simplicity and empowerment throughout the
            process can heighten your chances of successfully reaching your
            aspirations.
          </p>
        </div>
      </div>
      <div className="customer-reviews mb-5">
        <div className="mb-5">
          <h2 className="home-page-text">Customer Reviews</h2>
          <p className="home-page-text">
            "This app redefined how I approach my fitness goals, offering an
            intuitive platform to track my workouts and progress with ease. Its
            straightforward interface keeps me motivated, and the convenience of
            having all my fitness data in one place is truly remarkable."
          </p>
        </div>
        <div className="p-0">
          <img
            src="https://images.pexels.com/photos/1103832/pexels-photo-1103832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Customer Review"
          />
        </div>
      </div>
    </div>
  );
}
