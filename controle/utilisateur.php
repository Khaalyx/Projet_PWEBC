<?php

function login() {
    require('./vue/login.html');
}

function accueil() {
    require('./vue/accueil.html');
}

function profil() {
    $msg = "";
    require('./vue/profil.html');
}

function ident () {
    $pseudo=isset($_POST['pseudoLogin'])?($_POST['pseudoLogin']):'';
    $mdp=isset($_POST['mdpLogin'])?($_POST['mdpLogin']):'';
    $msg="";

    if (count($_POST)==0) require("vue/login.html");
    else {
        if ($pseudo == '' || $mdp == ''){
            $msg = "Paramètre(s) manquant(s)...";
            require("vue/login.html");
        }
        else {
            require ("./modele/utilisateurBD.php");
        
            if (verifIdent_bd($pseudo, $mdp, $profil)) { 
                $_SESSION['profil'] = $profil;
                require("vue/accueil.html");
            }
            else {
                $msg = "Nom d'utilisateur ou mot de passe incorrect.";
                require("vue/login.html");
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

    if (count($_POST)==0) require("vue/login.html");
    else {
        if ($pseudo == '' || $mdp == '' || $verifMdp == '' || $email == ''){
            $msg = "Paramètre(s) manquant(s)...";
            require("vue/login.html");
        }
        else {
            if ($verifMdp != $mdp){
                $msg = "Les 2 mots de passe sont différents";
                require("vue/login.html");
            }
            else{
                require ("./modele/utilisateurBD.php");
        
                if (!verif_inscription($pseudo, $email, $msg)) {
                    require("vue/login.html");
                }
                else {
                    inscrire($pseudo, $mdp, $email);
                    $_SESSION['profil'] = array("pseudo"=>$pseudo);
                    require("vue/accueil
.html");
                }
            }
        }
    }
}

function updateMdp() {
    $oldMdp=isset($_POST['oldMdp'])?($_POST['oldMdp']):'';
    $newMdp=isset($_POST['newMdp'])?($_POST['newMdp']):'';
    $verifNewMdp=isset($_POST['verifNewMdp'])?($_POST['verifNewMdp']):'';
    $msg="";

    if (count($_POST)==0) require("vue/profil.html");
    else {
        if ($oldMdp == '' || $newMdp == '' || $verifNewMdp == ''){
            $msg = "Paramètre(s) manquant(s)...";
            require("vue/profil.html");
        }
        else {
            if ($verifNewMdp != $newMdp){
                $msg = "Les 2 mots de passe sont différents.";
                require("vue/profil.html");
            }
            else{
                require ("./modele/utilisateurBD.php");
        
                if (!verifMdp($_SESSION['profil']['Pseudo'], $oldMdp)) {
                    $msg = "L'ancien mot de passe est incorrect.";
                    require("vue/profil.html");
                }
                else {
                    updateMdpBD($_SESSION['profil']['Pseudo'], $newMdp);
                    $msg = "Le mot de passe a été modifié avec succès.";
                    require("vue/profil.html");
                }
            }
        }
    }
}

function updatePseudo() {
    $pseudo=isset($_POST['pseudo'])?($_POST['pseudo']):'';
    $msg="";

    if (count($_POST)==0) require("vue/profil.html");
    else {
        if ($pseudo == ''){
            $msg = "Veuillez saisir un pseudo.";
            require("vue/profil.html");
        }
        else {
            if ($pseudo == $_SESSION['profil']['Pseudo']){
                $msg = "Le pseudo est identique à celui que vous avez actuellement.";
                require("vue/profil.html");
            }
            else{
                require ("./modele/utilisateurBD.php");
        
                if (!verifPseudo($pseudo)) {
                    $msg = "Le pseudo existe déjà.";
                    require("vue/profil.html");
                }
                else {
                    updatePseudoBD($_SESSION['profil']['Pseudo'], $pseudo);
                    $_SESSION['profil']['Pseudo'] = $pseudo;
                    $msg = "Le pseudo à été modifié.";
                    require("vue/profil.html");
                }
            }
        }
    }
}

function deconnexion() {
    $msg='';
    $pseudo='';
    require("./vue/login.html");
    session_destroy();
}

?>