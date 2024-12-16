import {Suspense, useEffect, useState} from 'react'
// Suspense (from React):
// Suspense allows React to "wait" for something (like data or components) to load before rendering the UI. It's often used with lazy loading or asynchronous components.
// מאפשר ל-React "להמתין" לטעינת נתונים או רכיבים לפני רינדור ה-UI. משמש לרוב עם טעינה עצלה או רכיבים אסינכרוניים.
// useEffect (from React):
// A React hook used to perform side effects in a functional component. For example, fetching data, updating the DOM, or subscribing/unsubscribing to events.
// Hook של React שמאפשר לבצע פעולות צדדיות (Side Effects) בתוך רכיב פונקציונלי, כמו בקשת נתונים מהשרת, עדכון ה-DOM, או הרשמה/ביטול הרשמה לאירועים.
// useState (from React):
// A React hook for managing state in a functional component. It lets you add and track dynamic variables (state) in your app.
// Hook של React לניהול מצב (State) בתוך רכיב פונקציונלי. מאפשר לעקוב אחר משתנים דינמיים באפליקציה.
import {Canvas} from '@react-three/fiber'
// Canvas (from @react-three/fiber):
// A React wrapper for Three.js that simplifies the process of creating 3D graphics. Canvas is the main component that provides a 3D rendering context for your scene.
// מעטפת React ל-Three.js שמפשטת את תהליך יצירת הגרפיקה התלת-ממדית. Canvas מספק הקשר רינדור תלת-ממדי לסצנה שלך.
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
// OrbitControls (from @react-three/drei):
// A helper component that allows users to interact with 3D objects using mouse or touch input. It enables actions like rotating, zooming, and panning the camera.
// רכיב עזר שמאפשר למשתמשים ליצור אינטראקציה עם אובייקטים תלת-ממדיים באמצעות עכבר או מגע. מאפשר פעולות כמו סיבוב, זום והזזת המצלמה.
// Preload (from @react-three/drei):
// A utility that preloads assets like textures or 3D models to ensure they are available before rendering the scene, improving performance and preventing flickers.
// כלי שמאפשר טעינה מוקדמת של משאבים (Assets) כמו טקסטורות או מודלים תלת-ממדיים, כדי לשפר ביצועים ולמנוע הבהובים.
// useGLTF (from @react-three/drei):
// A hook that simplifies loading GLTF/GLB 3D models. GLTF is a common 3D model format used in web applications.
// Hook שמפשט את הטעינה של מודלים תלת-ממדיים בפורמט GLTF/GLB. GLTF הוא פורמט נפוץ למודלים תלת-ממדיים באינטרנט
import CanvasLoader from '../Loader'
import { u } from 'framer-motion/client'


const Computers = ({ isMobile }) => { 
  // הגדרת קומפוננטת `Computers`, שמקבלת פרופ `isMobile` להתאמה למכשירים ניידים.
  console.log('Computers component rendered with isMobile:', isMobile);
  
  
  const computer = useGLTF('./computer_desk1/scene.gltf'); 
  // טעינת מודל תלת-ממדי של מחשב שולחני באמצעות GLTF Loader.

  // const computer = useGLTF('./a_pe rsonal_computer/scene.gltf');
  // דוגמה לטעינת מודל תלת-ממדי חלופי, כרגע בתגובה.

  // return (
  //   <div>Computers11</div>
  // );
  // קוד לדוגמה לצורכי בדיקה, כרגע בתגובה.

  return (
    <mesh> 
      {/* מיכל להצגת אובייקטים תלת-ממדיים ותאורות. */}
      
      <hemisphereLight intensity={3} groundColor="black" />
      {/* הוספת תאורת המיספירה עם עוצמה גבוהה וצבע קרקע שחור. */}
      
      <pointLight intensity={1} />
      {/* הוספת תאורה נקודתית להארת הסצנה. */}
      
      <spotLight 
        position={[-20, 50, 10]} //מיקום
        angle={0.12} //זווית
        penumbra={1} //شبه ظل 
        intensity={1} //עוצמה
        castShadow // الظل الملقى
        shadow-mapSize={1024} 
      />
      {/* הוספת תאורת ספוט עם מיקום, זווית, והגדרות צל מתאימות. */}

      <primitive 
        object={computer.scene} 
        scale={isMobile ? 2 : 3}  // مقياس 
        position={isMobile ? [0, -3, -2.2] : [0, -2, -1.5]} 
        rotation={[0.12, -0.2, 0]} 
      />
      {/* הצגת המודל התלת-ממדי עם קנה מידה, מיקום, וסיבוב המשתנים לפי `isMobile`. */}
    </mesh>
  );
};

const ComputersCanvas = () => { 
  // הגדרת קומפוננטת `ComputersCanvas` שמגדירה את הקונטקסט להצגה ומעבירה נתונים ל-`Computers`.

  const [isMobile, setIsMobile] = useState(false); 
  // משתנה מצב למעקב אחרי האם המכשיר הוא נייד.

  useEffect(() => { 
    // שימוש ב-Hook לזיהוי שינויים בגודל המסך ולעדכון `isMobile`.

    const mediaQuery = window.matchMedia('(max-width: 500px)'); 
    // יצירת שאילתת מדיה לבדיקה אם הרוחב של המסך הוא פחות מ-500 פיקסלים.

    setIsMobile(mediaQuery.matches); 
    // עדכון `isMobile` בהתאם להתאמת שאילתת המדיה הנוכחית.
    console.log('Initial isMobile:', mediaQuery.matches);

    const handleMediaQueryChange = (event) => { 
      console.log('Media query change detected. New isMobile:', event.matches);
      setIsMobile(event.matches); 
      // עדכון `isMobile` בכל פעם ששאילתת המדיה משתנה.
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange); 
    // הוספת מאזין אירועים לשינויים בשאילתת המדיה.

    return () => { 
      mediaQuery.removeEventListener('change', handleMediaQueryChange); 
      // ניקוי מאזין האירועים כשהקומפוננטה מסיימת את פעילותה.
    };
  }, []); 
  // הרצת ה-Hook רק פעם אחת אחרי שהקומפוננטה נטענת.

  return (
    <Canvas 
      frameLoop="demand" 
      shadows 
      camera={{ position: [20, 3, 5], fov: 25 }} 
      gl={{ preserveDrawingBuffer: true }} 
    >
      {/* יצירת קנבס להצגת גרפיקה תלת-ממדית עם הגדרות מצלמה וצללים. */}

      <Suspense fallback={<CanvasLoader />}> 
        {/* שימוש במרכיב fallback בזמן שנטענים משאבי התלת-ממד. */}

        <OrbitControls 
          enableZoom={true} 
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 2} 
        />
        {/* הוספת שליטה לסיבוב הסצנה, עם הגבלת תנועה אנכית. */}

        <Computers isMobile={isMobile} /> 
        {/* הצגת קומפוננטת `Computers` והעברת ערך `isMobile` כפרופ. */}
      </Suspense>

      <Preload all /> 
      {/* טעינת כל המשאבים מראש לשיפור ביצועים. */}
    </Canvas>
  );
};

export default ComputersCanvas; 
// ייצוא ברירת מחדל של הקומפוננטה `ComputersCanvas` לשימוש בחלקים אחרים של האפליקציה.



