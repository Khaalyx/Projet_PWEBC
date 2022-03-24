<?php 
	session_start ();
		
		if (count($_GET)==0)	{
				$controle = "utilisateur";
				$action = "ident";		
		}
		elseif (isset($_GET['controle']) && isset ($_GET['action'])) {
				$controle = $_GET['controle'];   //cas d'un appel à index.php 
				$action =  $_GET['action'];	//avec les 2 paramètres controle et action, on affiche le contrôle demandé par l'utilisateur
		}
	//echo ('controle : ' . $controle . ' et <br/> action : ' . $action);	
	require ('./controle/' . $controle . '.php');
	$action(); // On exécute la fonction dont le nom est dans la variable $action
?>