
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
import SinglePost from "./Pages/SinglePost";
import UpdatePost from "./Pages/UpdatePost";
import Search from "./Pages/Search";
import ScrollToTop from "./components/ScrollToTop";
import Page404 from "./Pages/Page404";




function App() {




  return (
    <BrowserRouter>
    <ScrollToTop />
           <Navbar />
       <Routes>
         <Route    path='/'   element={<Home />} />
         <Route    path='/about'   element={<About />} />
         <Route    path='/sign-in'   element={<Signin />} />
         <Route    path='/sign-up'   element={<Signup />} />
         <Route    path='/search'   element={<Search />} />
         <Route    path='*'   element={<Page404/>} />
         <Route    path='/post/:slug'   element={<SinglePost />} />
         
         

         
         <Route    element={<PrivateRoute/>} >
         <Route    path='/dashboard'   element={<Dashboard />} />
         </Route>

         <Route    element={<OnlyAdminPrivateRoute/>} >
         <Route    path='/create-post'   element={<CreatePost />} />
         <Route    path='/update-post/:postId'   element={<UpdatePost/>} />
         </Route>



         
       </Routes>

       <Footer />
    </BrowserRouter>
  );
}

export default App;
