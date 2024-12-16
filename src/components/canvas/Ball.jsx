import React ,{Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Decal, Float, OrbitControls, Preload, useTexture
} from "@react-three/drei"
import CanvasLoader from '../Loader';


const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]); // Load the texture

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb" // Base color
          polygonOffset // Avoid Z-fighting
          polygonOffsetFactor={-5}
          flatShading 
        />
        <Decal
          position={[0, 0, 1]} // Front of the ball
          rotation={[0, 0, 0]} // No rotation
          scale={[1, 1, 1]} // Adjust scale if needed
          map={decal} // Use the loaded texture
        />
        {/* Second Decal: Back */}
        <Decal
          position={[0, 0, -1]} // Back of the ball
          rotation={[0, Math.PI, 0]} // Rotate 180° on Y-axis
          scale={[1, 1, 1]} // Adjust scale if needed
          map={decal} // Use the same texture
        />
        {/* Third Decal: Left */}
        <Decal
          position={[-1, 0, 0]} // Left side of the ball
          rotation={[0, Math.PI / 2, 0]} // Rotate 90° on Y-axis
          scale={[1, 1, 1]} // Adjust scale if needed
          map={decal} // Use the same texture
        />
        {/* Fourth Decal: Right */}
        <Decal
          position={[1, 0, 0]} // Right side of the ball
          rotation={[0, -Math.PI / 2, 0]} // Rotate -90° on Y-axis
          scale={[1, 1, 1]} // Adjust scale if needed
          map={decal} // Use the same texture
        />
        
      </mesh>
    </Float>
  )
}


const BallCanvas= ({icon})=>{
  return(
    <Canvas 
    frameLoop="demand" 
    
     
    gl={{ preserveDrawingBuffer: true }} 
  >
    {/* יצירת קנבס להצגת גרפיקה תלת-ממדית עם הגדרות מצלמה וצללים. */}

    <Suspense fallback={<CanvasLoader />}> 
      {/* שימוש במרכיב fallback בזמן שנטענים משאבי התלת-ממד. */}

      <OrbitControls enableZoom={false}    />
      {/* הוספת שליטה לסיבוב הסצנה, עם הגבלת תנועה אנכית. */}

      <Ball imgUrl={icon}   />
      {/* הצגת קומפוננטת `Computers` והעברת ערך `isMobile` כפרופ. */}
    </Suspense>

    <Preload all /> 
    {/* טעינת כל המשאבים מראש לשיפור ביצועים. */}
  </Canvas>
  );
};

export default BallCanvas