const logout = (req, res) => {
    res.clearCookie("admin", {
        httpOnly: true,
        secure: true,
        sameSite: "none" // use the same value you used when setting it
    });

    res.status(200).json({ message: "Logged out" });
};

module.exports = { logout }