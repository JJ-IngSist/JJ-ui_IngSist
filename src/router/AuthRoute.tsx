import { Route, Redirect } from 'react-router-dom';

interface props {component: Function, path:string}

const AuthRoute = ({component: Component, ...rest}: props) => {
    return (
        <Route {...rest}
            render={props => {
                if (localStorage.getItem('token')) return <Component {...props}/>;
                return <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>;
            }}/>

    )
}

export default AuthRoute;