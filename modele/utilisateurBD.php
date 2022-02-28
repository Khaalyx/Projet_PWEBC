<?php

function verifIdent_bd($pseudo, $password, &$profil) {
    require('connectBD.php');

    $sql='SELECT pseudo, mdp FROM UTILISATEURS WHERE pseudo = :pseudo AND mdp = :mdp';
    try {
        $cmd=$pdo->prepare($sql);
        $cmd->bindParam(':pseudo', $pseudo , PDO::PARAM_STR);
        $cmd->bindParam(':mdp', $password , PDO::PARAM_STR);
        $bool=$cmd->execute();

        if ($bool) {
            $res = $cmd->fetchAll(PDO::FETCH_ASSOC); //tableau d'enregistrements
        }
        else{
            return false;
        }
    }
    catch (PDOException $e) {
            echo utf8_encode("Echec de select : " . $e->getMessage() . "\n");
            die(); // On arrête tout.
    }
    if(count($res) == 0) {
        $profil = array();
        return false;
    }
    else{
        $profil = array("Pseudo" => $res[0]['pseudo']);
        return true; 
    }

}


function inscrire($pseudo, $mdp, $email) {
    require('./modele/connectBD.php');

    $sql = 'INSERT INTO UTILISATEURS (pseudo, mdp, email)
            VALUES (:pseudo, :mdp, :email)';

    try {
        $cmd=$pdo->prepare($sql);

        $cmd->bindParam(':pseudo', $pseudo, PDO::PARAM_STR);
        $cmd->bindParam(':mdp', $mdp, PDO::PARAM_STR);
        $cmd->bindParam(':email', $email, PDO::PARAM_STR);

        $cmd->execute();

    } catch (Exception $e) {
        echo utf8_encode("Echec de insert : " . $e->getMessage() . "\n");
        die(); // On arrête tout.
    }

}

/**
 * Verifie l'email pour savoir si celui qui souhaite faire l'inscription est deja dans la base
 * @return true si res a pris le contenu de la requete
 */
function verif_inscription($pseudo, $email, &$msg) {
require('./modele/connectBD.php');
$res = array();
$sql = 'SELECT * FROM `UTILISATEURS` WHERE email=:email OR pseudo=:pseudo';

try {
    $cmd=$pdo->prepare($sql);
    $cmd->bindParam(':email', $email , PDO::PARAM_STR);
    $cmd->bindParam(':pseudo', $pseudo, PDO::PARAM_STR);
    $bool=$cmd->execute();
        
    if ($bool) {
        $res = $cmd->fetchAll(PDO::FETCH_ASSOC); //tableau d'enregistrements
    }
    else{
        return false;
    }

    if(count($res) == 0) {
        return true;
    }
    else {
        foreach($res as $r){
            if($r['pseudo'] == $pseudo){
                $msg = "Le pseudo existe déjà.";
                return false;
            }
            if($r['email'] == $email){
                $msg = "Adresse email déjà utilisé.";
                return false;
            }
        }
    }
}
catch (PDOException $e) {
        echo utf8_encode("Echec de select : " . $e->getMessage() . "\n");
        die(); // On arrête tout.
    }
}


?>