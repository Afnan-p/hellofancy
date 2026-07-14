import { motion } from 'framer-motion';
import { ArrowRight, Heart, Gift, ShieldCheck, Leaf, Sparkles, Users, Package, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="bg-[#f8f9fa] pt-32 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="container mx-auto px-4 lg:px-8 mb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-white text-primary text-[10px] font-bold tracking-wide uppercase mb-6 shadow-sm">
              <Sparkles size={12} className="text-primary" /> ABOUT US <Sparkles size={12} className="text-primary" />
            </div>
            
            <h1 className="text-5xl md:text-[4rem] font-bold tracking-tight mb-6 text-slate-900 leading-[1.1] font-serif">
              Thoughtfully Curated.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Beautifully Yours.</span>
            </h1>
            
            <p className="text-slate-600 font-medium text-lg mb-10 max-w-lg leading-relaxed">
              At HELLO Fancy, we believe every gift tells a story. Our collections are handpicked with love and curated to make every moment unforgettable.
            </p>
            
            <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-primary/20 text-primary font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm">
              Discover Our Collections <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(233,30,99,0.1)] aspect-[4/3] bg-pink-50">
              <img 
                src="/about_hero.png" 
                alt="Luxurious Gifts" 
                className="w-full h-full object-cover mix-blend-multiply opacity-95" 
              />
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="container mx-auto px-4 lg:px-8 mb-32">
        <div className="bg-white rounded-[3rem] p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-pink-50">
              <img 
                src="/about_story.png" 
                alt="Our Story" 
                className="w-full h-full object-cover mix-blend-multiply opacity-95 hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="w-full lg:w-1/2 pr-0 lg:pr-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-pink-50 text-primary text-[10px] font-bold tracking-wide uppercase mb-6">
              <Sparkles size={12} /> OUR STORY <Sparkles size={12} />
            </div>
            
            <h2 className="text-4xl font-bold tracking-tight mb-6 text-slate-900 font-serif">
              The Story Behind <br /><span className="text-primary">HELLO Fancy</span>
            </h2>
            
            <p className="text-slate-600 font-medium mb-6 leading-relaxed">
              HELLO Fancy was born out of a simple idea – to make gifting meaningful, personal, and beautiful. 
            </p>
            <p className="text-slate-600 font-medium mb-12 leading-relaxed">
              What started as a small passion project is now a growing brand trusted by thousands of happy customers.
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-primary shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">10K+</div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">Happy Customers</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-primary shrink-0">
                  <Package size={20} />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">500+</div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">Curated Products</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-primary shrink-0">
                  <ThumbsUp size={20} />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">99%</div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">Customer Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* 3. OUR VALUES SECTION */}
      <section className="container mx-auto px-4 lg:px-8 mb-32 text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-white text-primary text-[10px] font-bold tracking-wide uppercase mb-4 shadow-sm mx-auto">
            <Sparkles size={12} /> WHAT WE STAND FOR <Sparkles size={12} />
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-16 text-slate-900 font-serif">
            Our <span className="text-primary">Values</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {[
            { icon: Heart, title: 'Quality First', text: 'We never compromise on quality. Every product is carefully selected.' },
            { icon: Gift, title: 'Thoughtful Gifting', text: 'We believe in the power of thoughtful gifts to create lasting memories.' },
            { icon: ShieldCheck, title: 'Trust & Transparency', text: 'Honest pricing, clear policies, and customer first approach.' },
            { icon: Leaf, title: 'Sustainable Choice', text: 'We support conscious choices and eco-friendly practices.' },
            { icon: Sparkles, title: 'Made with Love', text: 'Every order is packed with love and delivered with care.' }
          ].map((val, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(233,30,99,0.03)] hover:shadow-[0_15px_40px_rgba(233,30,99,0.08)] border border-gray-50 transition-all duration-300 flex flex-col items-center group"
            >
              <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <val.icon size={24} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-slate-900 mb-3">{val.title}</h3>
              <p className="text-gray-500 text-xs font-medium leading-relaxed">{val.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="container mx-auto px-4 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative rounded-[3rem] overflow-hidden shadow-sm"
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-pink-50">
            <img 
              src="/about_cta.png" 
              alt="Gift Boxes" 
              className="w-full h-full object-cover mix-blend-multiply opacity-80" 
            />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-12 md:p-20 bg-gradient-to-r from-white/95 via-white/80 to-transparent">
            <div className="max-w-xl text-left">
              <h2 className="text-4xl font-bold tracking-tight mb-4 text-slate-900 font-serif">
                Let's Make Every Moment <span className="text-primary">Special</span>
              </h2>
              <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                Thank you for being a part of our journey. We are honored to be part of your special moments.
              </p>
              <Link to="/shop" className="inline-block bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-pink-600 hover:shadow-[0_10px_25px_rgba(233,30,99,0.25)] transition-all duration-300 transform hover:-translate-y-1">
                Shop Now <ArrowRight size={16} className="inline ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default About;
