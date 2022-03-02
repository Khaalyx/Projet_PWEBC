<?php

function accueil() {
    require('./vue/accueil.html');
}

function ident () {
    $pseudo=isset($_POST['pseudoLogin'])?($_POST['pseudoLogin']):'';
    $mdp=isset($_POST['mdpLogin'])?($_POST['mdpLogin']):'';
    $msg="";

    if (count($_POST)==0) require("vue/accueil.html");
    else {
        if ($pseudo == '' || $mdp == ''){
            $msg = "Paramètre(s) manquant(s)...";
            require("vue/accueil.html");
        }
        else {
            require ("./modele/utilisateurBD.php");
        
            if (verifIdent_bd($pseudo, $mdp, $profil)) { 
                $_SESSION['profil'] = $profil;
                require("vue/index.html");// a changer plus tard
            }
            else {
                $msg = "Nom d'utilisateur ou mot de passe incorrect.";
                require("vue/accueil.html");
            }
        }
    }
}

function inscription() {
    $pseudo=isset($_POST['pseudoSignup'])?($_POST['pseudoSignup']):'';
    $mdp=isset($_POST['mdpSignup'])?($_POST['mdpSignup']):'';
    $verifMdp=isset($_POST['verifMdp'])?($_POST['verifMdp']):'';
    $email=isset($_POST['email'])?($_POST['email']):'';
    $msg="";

    if (count($_POST)==0) require("vue/accueil.html");
    else {
        if ($pseudo == '' || $mdp == '' || $verifMdp == '' || $email == ''){
            $msg = "Paramètre(s) manquant(s)...";
            require("vue/accueil.html");
        }
        else {
            if ($verifMdp != $mdp){
                $msg = "Les 2 mots de passe sont différents";
                require("vue/accueil.html");
            }
            else{
                require ("./modele/utilisateurBD.php");
        
                if (!verif_inscription($pseudo, $email, $msg)) {
                    require("vue/accueil.html");
                }
                else {
                    inscrire($pseudo, $mdp, $email);
                    $_SESSION['profil'] = array("pseudo"=>$pseudo);
                    require("vue/accueil.html");// a chnager plus tard
                }
            }
        }
    }
}

?>