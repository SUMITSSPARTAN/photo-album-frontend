import { useState, type CSSProperties, type FormEvent } from "react";
import { authService } from "../services/authService";

const pageStyle: CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f6f8",
    fontFamily: "Arial, sans-serif",
};

const formStyle: CSSProperties = {
    width: 360,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 24,
    backgroundColor: "#ffffff",
    border: "1px solid #d6dbe1",
    borderRadius: 8,
    boxShadow: "0 8px 24px rgba(17, 24, 39, 0.08)",
};

const inputStyle: CSSProperties = {
    height: 40,
    padding: "0 10px",
    border: "1px solid #c8d0d8",
    borderRadius: 6,
    fontSize: 14,
};

const buttonStyle: CSSProperties = {
    height: 40,
    border: "none",
    borderRadius: 6,
    backgroundColor: "#1f6feb",
    color: "#ffffff",
    fontSize: 14,
    cursor: "pointer",
};

const errorStyle: CSSProperties = {
    minHeight: 18,
    color: "#b42318",
    fontSize: 13,
};

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            await authService.login(email, password);
            onLogin();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to log in");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main style={pageStyle}>
            <form style={formStyle} onSubmit={submitLogin}>
                <h1 style={{ margin: 0, fontSize: 24 }}>Photo Album</h1>
                <input
                    style={inputStyle}
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                    autoComplete="email"
                    required
                />
                <input
                    style={inputStyle}
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                />
                <div style={errorStyle}>{error}</div>
                <button style={buttonStyle} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
            </form>
        </main>
    );
}
