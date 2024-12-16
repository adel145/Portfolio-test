import { BrowserRouter } from "react-router-dom"
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas} from './components';

const App=()=> { 

  return (
    <BrowserRouter>
    <div className="relatuve z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
       <h1 className="bold">this is a template for website and this the sections:</h1>
       <h2>and this link for youtube video :<h3>https://www.youtube.com/watch?v=0fYi8SGA20k&t=825s</h3> </h2>

        <Navbar />
        <Hero />
      </div>
      <About/>
      <Experience/>
      <Tech/>
      <Works/>
      <Feedbacks/>
      <div className="relative z-0">
        <Contact/>
        <StarsCanvas/>
      </div>
    </div>
    </BrowserRouter>
       
  )
}

export default App
