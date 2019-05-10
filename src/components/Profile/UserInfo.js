import React from 'react';

const UserInfo = ({ session: { getCurrentUser } }) => {

    const _formatDate = date => {
        return new Date(+date).toLocaleDateString('en-US');
    };

    return (
        <div>
            <h3>User Info</h3>
            <p>Username: {getCurrentUser.username}</p>
            <p>Email: {getCurrentUser.email}</p>
            <p>Join Date: {_formatDate(getCurrentUser.joinDate)}</p>
            <ul>
                <h3>{getCurrentUser.username}`s Favorites</h3>
            </ul>
        </div>
    );
};

export default UserInfo;