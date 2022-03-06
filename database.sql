CREATE SCHEMA garaauto;
USE garaauto;
CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    password VARCHAR(100) NOT NULL,
    roles VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'INITIAL',
    email VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    recent_login_time DATETIME,
    PRIMARY KEY (id)
);
CREATE TABLE login_tokens (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    token CHAR(255),
    user_id INT UNSIGNED NOT NULL,
    created_at datetime NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- password ducquang123
INSERT INTO users VALUE (
        DEFAULT,
        "$2a$12$QE5VKmeBHfqXTebeK8Vjc.MAMKdfc.UjmFr1b9EcaE6956Nop2eli",
        "ADMIN",
        "ACTIVE",
        "ducquang03102000@gmail.com",
        NOW(),
        NOW()
    );