import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import Attendance from './components/Attendance';
import ListCompanies from './components/Companies';
import Device from './components/Device';
import Leave from './components/Leave';
import Start from './components/Start';

const App = () => {
  return (
    // This is router
    <Router>
      <>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Start} />
            <Route exact path='/login' component={AdminLogin} />
            <Route exact path='/device' component={Device} />
            <Route exact path='/companies' component={ListCompanies} />
            <Route exact path='/attendance' component={Attendance} />
          </Switch>
        </div>
      </>
    </Router>
  );
};

export default App;

