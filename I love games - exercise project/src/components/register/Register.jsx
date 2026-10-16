
import { useNavigate } from "react-router";

export default function Register({ onRegister }) {
    const navigate = useNavigate();

    const registerHandler = (formData) => {
        const email = formData.get("email")?.trim();
        const password = formData.get("password");
        const confirmPassword = formData.get("confirm-password");

        if (!email || !password || !confirmPassword) {
            alert("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        onRegister({ email });

        navigate("/");
    };

    return (
        <section id="register-page" className="content auth">
            <form id="register" action={registerHandler}>
                <div className="container">
                    <div className="brand-logo"></div>

                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        required
                    />

                    <label htmlFor="register-password">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        placeholder="Password"
                        required
                    />

                    <label htmlFor="confirm-password">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="Repeat Password"
                        required
                    />

                    <input
                        className="btn submit"
                        type="submit"
                        value="Register"
                    />
                </div>
            </form>
        </section>
    );
}
