const github = document.getElementById('profile');

document.addEventListener('DOMContentLoaded', async () => {
  let me = sessionStorage.getItem('profile');

  try {
    if (me) return loadProfile(JSON.parse(me))
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

  loadProfile(me);
})

function loadProfile(data) {
  document.getElementById('userAvatar').src = data.avatar_url;
  document.getElementById('text').innerText = '"' + data.bio + '"';
  document.getElementById('stats').innerHTML = `${data.followers} followers <i class="fas fa-user-friends"></i> <span class="color-primary">— suit ${data.following} personnes <i class="fas fa-users"></i> —</span> ${data.public_repos} repos publics <i class="fas fa-code-branch"></i>`;

  document.getElementById('profile').style.display = '';
}