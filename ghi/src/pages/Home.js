import { useState, useEffect } from "react";
import "../App.css";

export default function Home() {
  return (
    <div>
      <div className="hero-image">
        <div className="hero-text">
          <h1>Track your workouts</h1>
          <p>We got you covered</p>
          <button>Get Started</button>
          <p>Already a member? Log In</p>
        </div>
      </div>
      <div className="features">
        <div>
          <h2>Fitness Quest is free, easy, convinient</h2>
          <p>Plan your workouts, track your goals, feel your best</p>
        </div>
        <div>
          <img
            src="https://images.pexels.com/photos/4162583/pexels-photo-4162583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="App Demo Image"
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
        <div>
          <h2>Who Are We?</h2>
          <p>We are team 14</p>
        </div>
      </div>
      <div className="customer-reviews">
        <div>
          <h2>Customer Reviews</h2>
          <p>"Fitness Quest is the GOAT"</p>
          <p>- RandomUser2039</p>
        </div>
        <div>
          <img
            src="https://images.pexels.com/photos/13877085/pexels-photo-13877085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Customer Review"
          />
        </div>
      </div>
    </div>
  );
}

//info about app

//nothing personalized

//not gated login button

//navbar
