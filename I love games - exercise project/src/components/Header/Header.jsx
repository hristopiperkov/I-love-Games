import { Link } from "react-router";

export default function Header({ user }) {
    return (
        <header>
            <nav>
                <Link to="/" className="home">
                    <img src="/images/logo.png" alt="logo" />
                </Link>

                <Link to="/catalog">Catalog</Link>

                {user ? (
                    <div id="user">
                        <Link to="/games/create">Add Game</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                ) : (
                    <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
