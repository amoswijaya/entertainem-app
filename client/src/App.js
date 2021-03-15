import Home from './pages/Home'
import { BrowserRouter as Provider, Switch, Route } from 'react-router-dom'
import client from './config/index'
import { ApolloProvider } from '@apollo/client';
import NavBar from './components/navBar';
import AddMovie from './pages/addMovie';
import DetailMovie from './pages/detailMovie';
import DetailSeries from './pages/detailSeries';
function App() {
  return (
    <>
      <Provider>
        <ApolloProvider client={client}>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/movie/:id">
              <DetailMovie />
            </Route>
            <Route path="/movies">
              <h1>hello movie</h1>
            </Route>
            <Route path="/series/:id">
              <DetailSeries />
            </Route>
            <Route path="/series">
              <h1>hello series</h1>
            </Route>
            <Route path="/favorites">
              <h1>hello favorites</h1>
            </Route>
            <Route path="/addMovie">
              <AddMovie />
            </Route>
          </Switch>
        </ApolloProvider>

      </Provider>
    </>
  );
}

export default App;
