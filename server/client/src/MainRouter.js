import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import Signin from './user/Signin'
import Signup from './user/Signup'
import Profile from './user/Profile'
import Users from './user/Users'
import EditProfile from './user/EditProfile'
import PrivateRoute from './auth/PrivateRoute'
import FindPeople from './user/FindPeople'
import NewPost from './post/NewPost'
import SinglePost from './post/SinglePost'
import EditPost from './post/EditPost'
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Admin from './admin/Admin'

const MainRouter = () => {
    return (
        <div>
            <Menu />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
                <PrivateRoute path="/post/create" exact component={NewPost} />
                <Route path="/post/:postId" exact component={SinglePost} />
                
                <PrivateRoute exact path="/admin" component={Admin} />

                <Route path="/users" exact component={Users} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />

                <PrivateRoute path="/user/edit/:userId" exact component={EditProfile} />
                <PrivateRoute path="/post/edit/:postId" exact component={EditPost} />
                <PrivateRoute path="/user/:userId" exact component={Profile} />
                <PrivateRoute path="/findpeople" exact component={FindPeople} />


            </Switch>
        </div>
    )
}

export default MainRouter
