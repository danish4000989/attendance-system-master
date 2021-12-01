// import { Route, Redirect } from 'react-router-dom';
// import AuthContext from '../../context/auth/authContext';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { isAuthenticated, loading } = authContext;
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         !isAuthenticated && !loading ? (
//           <Redirect to='/login' />
//         ) : (
//           <Component {...props} />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
