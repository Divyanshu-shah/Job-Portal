/**
 * Home — Premium SaaS-style landing page.
 * Composed of modular landing sections with GSAP, Framer Motion, and Lottie animations.
 */
import Hero from '../components/landing/Hero';
import StatsSection from '../components/landing/StatsSection';
import FeaturesGrid from '../components/landing/FeaturesGrid';
import HowItWorks from '../components/landing/HowItWorks';
import FeaturedJobs from '../components/landing/FeaturedJobs';
import ParallaxDivider from '../components/landing/ParallaxDivider';
import CTASection from '../components/landing/CTASection';
import LandingFooter from '../components/landing/LandingFooter';

const Home = () => {
    return (
        <div className="landing-page">
            <Hero />
            <StatsSection />
            <HowItWorks />
            <FeaturesGrid />
            <ParallaxDivider>
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Trusted by <span className="bg-gradient-to-r from-violet-300 to-rose-300 bg-clip-text text-transparent">2,000+</span> Companies
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        From startups to Fortune 500 — the best companies hire through JobPortal.
                    </p>
                </div>
            </ParallaxDivider>
            <FeaturedJobs />
            <CTASection />
            <LandingFooter />
        </div>
    );
};

export default Home;
