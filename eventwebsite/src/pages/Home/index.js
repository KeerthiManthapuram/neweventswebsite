import 'bootstrap-icons/font/bootstrap-icons.css';

import Header from '../../components/Header';

import Header2 from '../../components/Header2';

import HeroSection from '../../components/HeroSection';

import UpcomingEvents from '../UpcomingEvents';

import RecommendedShows from '../RecommendedShows';


import './index.css';

const Home = () => (
    <div className='home-bg-container'>
        <Header />
        <Header2 />
        <HeroSection />
        <RecommendedShows />
        <UpcomingEvents />
    </div>
)

export default Home;