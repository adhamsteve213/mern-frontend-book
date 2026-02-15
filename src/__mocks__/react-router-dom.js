import React from 'react';

export const BrowserRouter = ({ children }) => <div>{children}</div>;
export const Routes = ({ children }) => <div>{children}</div>;
export const Route = ({ element }) => element || null;
export const Link = ({ children, to, className, ...rest }) => <a href={to} className={className} {...rest}>{children}</a>;
export const useNavigate = () => () => {};
export const useParams = () => ({});
export const useLocation = () => ({ pathname: '/' });
export const NavLink = Link;
export default {};
