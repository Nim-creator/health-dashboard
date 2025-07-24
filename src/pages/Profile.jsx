import { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Spinner, Tab, Tabs } from 'react-bootstrap';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useUpdateProfile
} from 'react-firebase-hooks/auth';
import { ref, set, onValue, off } from 'firebase/database';
import { auth, db } from '../firebase';

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState('profile');

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'Select gender',
    healthData: {}
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');

  const [
    signInWithEmailAndPassword,
    loginUser,
    loginLoading,
    loginError
  ] = useSignInWithEmailAndPassword(auth);

  const [
    createUserWithEmailAndPassword,
    registerUser,
    registerLoading,
    registerError
  ] = useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updateLoading, updateError] = useUpdateProfile(auth);

  useEffect(() => {
    if (!user) return;

    const userRef = ref(db, `users/${user.uid}`);

    const listener = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfileData({
          name: data.name || user.displayName || '',
          email: data.email || user.email || '',
          age: data.age || '',
          gender: data.gender || 'Select gender',
          healthData: data.healthData || {}
        });
      } else {
        setProfileData({
          name: user.displayName || '',
          email: user.email || '',
          age: '',
          gender: 'Select gender',
          healthData: {}
        });
      }
    });

    return () => off(userRef, 'value', listener);
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ displayName: profileData.name });

      await set(ref(db, `users/${user.uid}`), {
        name: profileData.name,
        email: user.email,
        age: profileData.age,
        gender: profileData.gender,
        healthData: profileData.healthData || {}
      });

      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(loginEmail, loginPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await createUserWithEmailAndPassword(registerEmail, registerPassword);
    if (res?.user) {
      await updateProfile({ displayName: registerName });
      await set(ref(db, `users/${res.user.uid}`), {
        name: registerName,
        email: registerEmail,
        age: '',
        gender: 'Select gender',
        healthData: {}
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>{user ? 'Your Profile' : 'Authentication'}</Card.Title>
      </Card.Header>
      <Card.Body>
        {!user ? (
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            <Tab eventKey="login" title="Login">
              <Form onSubmit={handleLogin}>
                {loginError && <Alert variant="danger">{loginError.message}</Alert>}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loginLoading}>
                  {loginLoading ? <Spinner size="sm" /> : 'Login'}
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="register" title="Register">
              <Form onSubmit={handleRegister}>
                {registerError && <Alert variant="danger">{registerError.message}</Alert>}
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={registerLoading}>
                  {registerLoading ? <Spinner size="sm" /> : 'Register'}
                </Button>
              </Form>
            </Tab>
          </Tabs>
        ) : (
          <>
            <Form onSubmit={handleProfileUpdate}>
              {updateError && <Alert variant="danger">{updateError.message}</Alert>}
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={user.email || ''} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  value={profileData.age}
                  onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  value={profileData.gender}
                  onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                >
                  <option value="Select gender">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={updateLoading}>
                {updateLoading ? <Spinner size="sm" /> : 'Update Profile'}
              </Button>
            </Form>

            {Object.keys(profileData.healthData).length > 0 && (
              <div className="mt-4">
                <h5>Your Health Data Summary</h5>
                <ul>
                  {Object.entries(profileData.healthData).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {JSON.stringify(value)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Profile;

