import react from 'react';


function UserMini () {

    const nickname = localStorage.getItem('nickname');
 return (
    <div>
        <h3><strong>{nickname}</strong></h3>
    </div>
 );
}

export default UserMini;