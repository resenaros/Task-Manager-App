import { useAuth0 } from "@auth0/auth0-react";
import { Col } from "react-bootstrap";
import type { Auth0User } from "../types/user";

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  // Only pick the defined fields from Auth0User
  const definedUser: Auth0User | undefined = user
    ? {
        sub: user.sub,
        name: user.name,
        email: user.email,
        picture: user.picture,
      }
    : undefined;

  if (!isAuthenticated) return <div>Not authenticated</div>;
  if (!definedUser) return <div>No user profile</div>;

  getAccessTokenSilently().then((token) => console.log("token", token));

  return (
    <>
      <h2>Profile Page</h2>
      <Col>
        {definedUser.picture && (
          <img src={definedUser.picture} alt={definedUser.name} />
        )}
        <h3>{definedUser.name}</h3>
        <p>
          <b>sub</b>: {definedUser.sub}
        </p>
        <p>
          <b>email</b>: {definedUser.email}
        </p>
      </Col>
    </>
  );
};

export default ProfilePage;
