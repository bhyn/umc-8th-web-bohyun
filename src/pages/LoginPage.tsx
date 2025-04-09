const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const handleLogin = async () => {
        await login(email, password)
    };

    return (
        <div >
            <h1>Login Page</h1>
            <input value={email} onChange={(e) => setEmail(e.target.value)}  />
            <input value={password} onChange={(e) => setPassword(e.target.value)}  />
            <button onClick={handleLogin}>Login</button>
        {/* Add your login form here */}
        </div>
    );
}

export default LoginPage;