import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

function UserListScreen( props ) {

    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const {loading, error, users} = userList;

    const userDelete = useSelector(state => state.userDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = userDelete;

    useEffect(() => {
        dispatch(listUsers());
        dispatch({type: USER_DETAILS_RESET});
    }, [dispatch, successDelete])

    const deleteHandler = (user) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteUser(user._id));
        }
    }

    return (
        <div>
            <h1>Users</h1>
            {loadingDelete && <LoadingBox />}
            {errorDelete && <MessageBox variant = 'danger'>{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant = 'success'>User Successfully Deleted</MessageBox>}
            {
                loading? (<LoadingBox />)
                :
                error? (<MessageBox variant = 'danger'>{error}</MessageBox>)
                :
                (
                    <table className = 'table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>EmailD</th>
                                <th>Is Seller</th>
                                <th>Is Admin</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key = {user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isSeller? 'Yes':'No'}</td>
                                        <td>{user.isAdmin? 'Yes':'No'}</td>
                                        <td>
                                            <button
                                                type = 'button' 
                                                className = 'small'
                                                onClick = {() => props.history.push(`/user/${user._id}/edit`)}
                                            >Edit</button>
                                            <button 
                                                type = 'button' 
                                                className = 'small' 
                                                onClick = {() => deleteHandler(user)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default UserListScreen
