
import  {BrowserRouter , Routes , Route} from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import Projects from "./Pages/Projects";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./components/Navbar";
import CreatePost from "./Pages/CreatePost";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";



function App() {




  return (
    <BrowserRouter>
           <Navbar />
       <Routes>
         <Route    path='/'   element={<Home />} />
         <Route    path='/about'   element={<About />} />
         <Route    path='/sign-in'   element={<Signin />} />
         <Route    path='/sign-up'   element={<Signup />} />
         <Route    path='/projects'   element={<Projects />} />
         

         
         <Route    element={<PrivateRoute/>} >
         <Route    path='/dashboard'   element={<Dashboard />} />
         </Route>

         <Route    element={<OnlyAdminPrivateRoute/>} >
         <Route    path='/create-post'   element={<CreatePost />} />
         </Route>
         
       </Routes>

       <Footer />
    </BrowserRouter>
  );
}

export default App;
