'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const featureCards = [
    { icon: "📄", title: "AI-Powered Writing", description: "Generate high-quality content effortlessly." },
    { icon: "⚙️", title: "Customization", description: "Fine-tune the content to match your needs." },
    { icon: "📖", title: "Templates", description: "Use pre-built templates for quick content." },
    { icon: "💬", title: "Collaboration", description: "Work together and refine your text." }
  ];
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center px-6">
      {/* Animated background particles */}
      {isLoaded && Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-20"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: `${Math.random() * 100 + 20}px`,
            height: `${Math.random() * 100 + 20}px`,
          }}
        />
      ))}
      
      {/* Light effect following cursor */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-white opacity-10 blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192
        }}
        transition={{ type: "spring", damping: 15 }}
      />

      <div className="max-w-3xl text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-extrabold mb-4 drop-shadow-lg"
        >
          AI Content{" "}
          <motion.span 
            className="text-yellow-400 inline-block"
            animate={{ 
              textShadow: ["0 0 5px rgba(250, 204, 21, 0.5)", "0 0 20px rgba(250, 204, 21, 0.8)", "0 0 5px rgba(250, 204, 21, 0.5)"] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Generator
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl text-gray-200 mb-6 font-semibold"
        >
          Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="px-6 py-3 text-lg font-bold bg-yellow-400 text-black rounded-xl shadow-lg hover:bg-yellow-500 relative overflow-hidden group"
            onClick={() => router.push('/sign-in')}
          >
            <span className="relative z-10">Log In →</span>
            <motion.span 
              className="absolute inset-0 bg-yellow-300 z-0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div 
        className="flex flex-wrap justify-center gap-8 mt-16 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        {featureCards.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white text-black rounded-lg shadow-lg text-center w-48 backdrop-blur-sm bg-opacity-90 relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
            }}
          >
            <motion.div 
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="text-4xl mb-3"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {feature.icon}
            </motion.div>
            <h3 className="font-bold text-lg">{feature.title}</h3>
            <p className="text-sm text-gray-700">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}