/* Copyright (c) 2020 Thomas Cardon */

/* variable globale pour réutiliser les données entre les deux fonctions */
var me = {};

function loadProfile() {
  return new Promise((resolve, reject) => {
    document.getElementById('userAvatar').onload = function() {
      console.log('Avatar >> loaded');
      resolve();
    }

    document.getElementById('userAvatar').src = me.avatar_url;
    document.getElementById('text').innerText = `"${me.bio}"`;
    document.getElementById('stats').innerHTML = `${me.followers} {{followers}} <span class="color-primary">— {{follows}} ${me.following} {{people}} —</span> ${me.public_repos} {{github.repo.public}}`;
  });
};

/*
* Cette fonction me permet de récupérer les données depuis l'API Github publique,
* de les stocker en cache dans sessionStorage,
* pour: -> ne pas à exécuter fetch à chaque rechargement de page
*       -> ne pas surcharger l'API publique et me faire rate-limit
*       -> économiser les ressources réseau
*/
LoadingQ.push(async () => {
  let data = sessionStorage.getItem('profile');

  try {
    if (me) me = JSON.parse(data);
  }
  catch(error) {
    console.error(error);
  }

  if (window.fetch) {
    let res = await fetch('https://api.github.com/users/ryzzzen');
    me = await res.json();

    console.log('>> Téléchargement du profil GitHub');
    console.dir(me)

    sessionStorage.setItem('profile', JSON.stringify(me));
  }
  else {
    console.log('>> Impossible de télécharger profil GitHub');
  }
});

LoadingQ.push(loadProfile);
