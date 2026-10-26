export default function Login({ onLogin }) {
    const submitAction = async (formData) => {
        const email = formData.get("email")?.trim();
        const password = formData.get("password");
        if (!email || !password) {
            alert("Email and password are required");
            return;
        }
        try {
            await onLogin({ email, password });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <section id="login-page">
            <form id="login" action={submitAction}>
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" required />
                    <label htmlFor="login-password">Password</label>
                    <input type="password" id="login-password" name="password" placeholder="Password" required />
                    <input type="submit" className="btn submit" value="Login" />
                </div>
            </form>
        </section>
    );
}
