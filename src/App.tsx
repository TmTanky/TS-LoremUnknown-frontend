import React, {FC} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux'

// Components
import Header from './components/header/header'
import Footer from './components/footer/footer'

// Pages
import RootPage from './pages/rootPage/root'
import LoginPage from './pages/loginPage/login'
import RegisterPage from './pages/registerPage/register'
import AboutPage from './pages/aboutPage/about'
import HomePage from './pages/homePage/home'

// Redux
import { IRootReducer } from './redux/reducers/rootReducer'

const App: FC = () => {

  const isUserLoggedIn = useSelector<IRootReducer>(state => state.isLoggedIn)

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path="/" render={() => isUserLoggedIn ? <Redirect to="/home"/> : <RootPage/> } />
            <Route path="/login" render={() => isUserLoggedIn ? <Redirect to="/home"/> : <LoginPage/> } />
            <Route path="/register" render={() => isUserLoggedIn ? <Redirect to="/home"/> : <RegisterPage/> } />
            <Route path="/about" component={AboutPage} />
            <Route path="/home" render={() => isUserLoggedIn ? <HomePage/> : <Redirect to="/"/> } />
          </Switch>
        <Footer/>  
      </BrowserRouter>
    </div>
  )
}

export default App;
