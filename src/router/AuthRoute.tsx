import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({component: Component, authenticated, ...rest}) => {
    return (
        <Route {...rest}
            render={props => {
                if (authenticated) return <Component {... rest} {...props}/>;
                return <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>;
            }}/>
    )
}

export default AuthRoute;