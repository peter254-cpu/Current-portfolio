import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import HackerRoom from "../components/HackerRoom";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import { Leva, useControls } from "leva";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../contants";
import Target from "../components/Target";
import ReactLogo from "../components/ReactLogo";
import HeroCamera from "../components/HeroCamera";
import Button from "../components/Button";

const Hero = () => {
  const isSmall = useMediaQuery({maxWidth: 440 })
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet)
  const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ, scale } = useControls(
    'HackerRoom', 
    {
      positionX: { 
        value: 2, 
        min: -10,
        max: 10 
      },
      positionY: { 
        value: -10, 
        min: -10, 
        max: 10
      },
      positionZ: { 
        value: 2.0, 
        min: -10, 
        max: 10
      },
      rotationX: {
        value: 0.0, 
        min: -10, 
        max: 10 
      },
      rotationY: { 
        value: -3.2, 
        min: -10, 
        max: 10 
      },
      rotationZ: { 
        value: 0.0, 
        min: -10, 
        max: 10 
      },
      scale: { 
        value: 0.1, 
        min: -10, 
        max: 10 
      },
    }
  );
  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-18 c-space gap-3">
        <p className="sm:text-3xl text-2xl text-white text-center font-medium font-generalSans">
          Hi, I'm Peter <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">
          Building Products And Brands
        </p>
      </div>
      <div className="w-full h-full absolute inset-0">
        <Leva />
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            <HeroCamera>
              <HackerRoom 
                position={sizes.deskPosition} 
                rotation={[0, -Math.PI, 0]} 
                scale={sizes.deskScale}
              />
            </HeroCamera>
            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
            </group>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>
      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#contact" className="w-fit">
          <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96"  />
        </a>
      </div>
    </section>
  );
};

export default Hero;
