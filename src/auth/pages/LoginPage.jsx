import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "../components/GoogleButton";

export const LoginPage = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/home", {
      replace: true,
    });
  };

  return (
    <>
      <div className="container mt-5">
        <h1>LoginPage</h1>
        <hr />
        <Button variant="success" onClick={onLogin}>
          Iniciar Sesión
        </Button>
        <hr />
        <GoogleButton />
      </div>
    </>
  );
};
