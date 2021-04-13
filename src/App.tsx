import React, {FC} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Components
import Header from './components/header/header'
import Footer from './components/footer/footer'

// Pages
import RootPage from './pages/rootPage/root'
import LoginPage from './pages/loginPage/login'
import RegisterPage from './pages/registerPage/register'

const App: FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path="/" component={RootPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
        <Footer/>  
      </BrowserRouter>
    </div>
  )
}

export default App;
