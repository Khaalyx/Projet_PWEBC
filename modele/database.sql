-- la base s'appelle projet_map

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE UTILISATEURS
(
    idUser INTEGER NOT NULL AUTO_INCREMENT,
    pseudo VARCHAR(50) NOT NULL UNIQUE,
    mdp VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    nbParties INTEGER DEFAULT 0,
    bestScore DECIMAL(10, 4),
    CONSTRAINT PK_IDUSER PRIMARY KEY (idUser)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO UTILISATEURS (idUser, pseudo, mdp, email)
VALUES (1, 'user', 'mdp', 'user@gmail.com');
INSERT INTO UTILISATEURS (idUser, pseudo, mdp, email)
VALUES (2, 'nanou', 'nanou', 'nanou@gmail.com');
INSERT INTO UTILISATEURS (idUser, pseudo, mdp, email)
VALUES (3, 'transy','transy', 'transy@gmail.com');


COMMIT;