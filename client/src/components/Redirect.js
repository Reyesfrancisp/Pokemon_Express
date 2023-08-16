import { Navigate, useLocation } from 'react-router-dom';

function Redirect(props) {
  const location = useLocation();

  if (!props.user && location.pathname === '/')
    return <Navigate to="/auth" state={{ from: location }} replace />;

  if (props.user && location.pathname === '/auth')
    return <Navigate to="/" state={{ from: location }} replace />;

  return props.children;
}

export default Redirect;