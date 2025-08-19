import './index.css' // Component-specific styles for the Hero section

// HeroSection component - displays the main promotional banner content
const HeroSection = () => (
    <div className='Hero-bg-container'>
        
        {/* Main heading for the hero section */}
        <h1 className='hero-section-text'>
            Discover Exciting Events Happening <br/>Near You - Stay Tuned for Updates!
        </h1>

        {/* Supporting description text for the hero section */}
        <p className='hero-section-desc'>
            Explore local concerts, workshops, and meetups tailored to your interests.
            Never miss out on trending events and last-minute surprises.
            Get personalized recommendations based on your location and preferences.
            Start your journey now and be where the action is!
        </p>
    </div>
)

export default HeroSection;
