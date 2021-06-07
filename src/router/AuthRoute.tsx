import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({component: Component, ...rest}) => {

    return (
        <Route {...rest}
            render={props => {
                if (document.cookie) return <Component {... rest} {...props}/>;
                return <Redirect to={{
                    pathname: '/feed',
                    state: {from: props.location}
                }}/>;
            }}/>
    )
}

export default AuthRoute;
