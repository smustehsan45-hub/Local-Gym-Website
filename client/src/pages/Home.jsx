export const Home=()=>{
    return (

        <>
        {/* main section */}
        <div className="container">
      <div className="main-section">
        <div className="left-side">
        <h1>Welcome to lifeFitness</h1>
        <p>At LifeFitness, we believe that fitness is not just a goal — it's a lifestyle. Our gym is designed for everyone, whether you're just starting out or you're a seasoned athlete. With state-of-the-art equipment, certified personal trainers, and a motivating environment, we’re here to help you build strength, stay healthy, and achieve your personal fitness goals.
<br />
From personalized workout plans and nutrition guidance to group classes and recovery zones, LifeFitness is more than just a gym — it’s your community of support, energy, and transformation.</p>
        <div className="btns">
        <button className="btn">Contact Us</button>
        <button style={{marginLeft:7}} className="btn">Online Booking</button>
        </div>
        </div>
        <div className="right-side">
            <img src="/images/main-page.jpeg" height="300" alt="" />
        </div>
      </div>
      <div className="analytics-section">
        
        <div>
            
            <p>Personal Training</p>
        </div>
        <div>
            
            <p> Nutrition Counseling</p>
        </div>
        <div>
            
            <p>Online Booking & Workout App</p>
        </div>
        <div>
          
            <p>24/7</p>
        
        </div>
      </div>
      </div>
<br />
    {/* about section */}
    <div className="container">
        <div className="about-section">
            <h1>About Us</h1>
            <p>At Life Fitness, we believe that fitness is more than just lifting weights or running miles – it's a way of life. Our mission is to empower individuals of all ages and fitness levels to unlock their full potential, both physically and mentally.
<br />
Established with passion and purpose, Life Fitness is more than just a gym – it's a supportive community where goals are set, challenges are conquered, and lives are transformed. Whether you're a beginner starting your fitness journey or a seasoned athlete pushing for the next level, our expert trainers, state-of-the-art equipment, and motivating environment are here to help you succeed.
<br />
<ul>
We offer a wide range of services, including:
<br /><br />
    <li>Strength & Conditioning</li>
    <li>Cardio & Endurance Training</li>
    <li>Personal Training</li>
    <li>Group Classes (HIIT, Yoga, Zumba & more)</li>
    <li>Nutritional Guidance</li>
</ul>
<div className="about-section-img">
<img src="/images/about1.webp" height="400" alt="" />
</div>
<br />
Join Life Fitness and experience a space where you’re not just working out — you’re building a better version of yourself.
<br /> <br />
 <b> Train hard. Stay strong. Live fit.</b></p>
 <br />
        </div>
    </div>
        </>

    )
}