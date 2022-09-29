import './App.css';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/Nav-bar';
import Countries from './components/Countries/Countries';
import CrearActividad from './components/Actividad/CrearActividad';
import About from './components/About/About';
import Filter from './components/Filters/Filters';
import Paginado from './components/Countries/Paginado';
import { DetailAct } from './components/Actividad/DetailAct';
import { Detail } from './components/Countries/Detail';
import {Route} from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
          <Route exact path="/">
            <Landing/>
          </Route>
          <Route path={['/countries', '/activities', '/about']}>
            <NavBar/>
          </Route>  
          <Route exact path="/countries">
            <Filter />
            <Countries />
          </Route>
          <Route exact path="/activities">
            <CrearActividad  />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/activities/:id" render={({match, location, history}) => <DetailAct match = {match} location = {location} history={history}/>}/>
          <Route path="/countries/:id">
            <Detail/>
          </Route>
    </div>
  );
}

export default App;
