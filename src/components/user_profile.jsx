import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/User_authentication/AuthContext'; // Adjust the path as needed

const UserProfile = () => {
    const { user } = useAuth(); // Get the user from context
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/user-profile/${user.id}/`); // Adjust the URL
                setProfile(response.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Could not fetch profile data.');
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div className="user-profile">
            <h1>User Profile</h1>
            <p><strong>Username:</strong> {profile.user.username}</p>
            <p><strong>Email:</strong> {profile.user.email}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
            <p><strong>Location:</strong> {profile.location}</p>
            <p><strong>Birth Date:</strong> {profile.birth_date}</p>
            <a href={`/edit-profile/${profile.id}`}>Edit Profile</a> {/* Link to edit profile if needed */}
        </div>
    );
};

export default UserProfile;