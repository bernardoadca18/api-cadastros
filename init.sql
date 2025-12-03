CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Vamos salvar em texto puro no código para o Sonar reclamar
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    full_name VARCHAR(100),
    bio TEXT
);

INSERT INTO users (username, email, password_hash) VALUES 
('admin', 'admin@example.com', '123456'),
('teste', 'teste@teste.com', 'qwerty');

INSERT INTO user_profiles (user_id, full_name, bio) VALUES
(1, 'Administrador do Sistema', 'Conta admin'),
(2, 'Usuario Teste', 'Apenas um teste');