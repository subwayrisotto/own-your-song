function handler(req, res) {
    res.status(200).json({ message: 'Hello from the backend!' });
}

module.exports = handler;