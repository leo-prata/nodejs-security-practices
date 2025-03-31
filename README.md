# Security Practices for NodeJS

This repository contains examples and implementations of various security practices for web applications, particularly focusing on Node.js and Express. Each folder corresponds to a specific security measure, demonstrating how to integrate it into your project.
## Security Practices

### Authentication Limits
Authentication limits restrict the number of login attempts from a single IP or user, helping to mitigate brute-force attacks by blocking or delaying further attempts after a set threshold.

### ESLint Plugin Security
The ESLint security plugin helps identify insecure coding patterns in JavaScript, such as the use of eval(), insecure regular expressions, or other practices that could lead to vulnerabilities like XSS or injection attacks.

### Helmet
Helmet is a collection of middleware functions that set security-related HTTP headers, such as Content Security Policy (CSP), X-Frame-Options, and others, to protect against common web vulnerabilities like clickjacking and XSS.

### JWT Blacklisting
JWT blacklisting involves maintaining a list of invalidated tokens to prevent their use before expiration, which is crucial for scenarios like user logout or token revocation due to security concerns.

### Password Encryption
Password encryption (more accurately, hashing) ensures that passwords are stored securely using one-way cryptographic functions like bcrypt, making it computationally infeasible to retrieve the original password from the stored hash.

### Payload Size Limiter
Payload size limiting restricts the maximum size of HTTP request bodies, protecting the server from being overwhelmed by large or malicious payloads that could lead to denial-of-service (DoS) attacks.

### Rate Limiting
Rate limiting restricts the frequency of requests from a single client or IP, helping to prevent abuse, brute-force attacks, and ensuring fair usage of server resources.

### Schema Validation
Schema validation verifies that incoming data (e.g., JSON payloads) adhere to predefined structures and constraints, preventing malformed or malicious data from causing errors or security issues.

## Usage
Each folder contains a simple implementation or example of the respective security practice. Refer to the individual READMEs or code comments within each folder for detailed usage instructions.

