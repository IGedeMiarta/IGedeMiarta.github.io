const currentURL = window.location.href;
const url = new URL(currentURL);
const targetSlug = url.searchParams.get('slug');
const base_url = window.location.origin;
if (targetSlug !== 'izidok-details') {
    document.getElementById('izidokImg').style.display = 'none';
    document.getElementById('izidok-bg').style.display = 'none';
}
if (targetSlug !== 'masterplan-details') {
    document.getElementById('masterImg').style.display = 'none';
    document.getElementById('masterplan-bg').style.display = 'none';
}
if (targetSlug !== 'avatar-details') {
    // document.getElementById('izidokImg').style.display = 'none';
    document.getElementById('avatar-bg').style.display = 'none';
}
if (targetSlug !== 'speedy-details') {
    // document.getElementById('izidokImg').style.display = 'none';
    document.getElementById('speedy-bg').style.display = 'none';
}
fetch('/assets/text.json')
  .then(response => response.json())
  .then(data => {
    // Find the project with the specified slug
 

    const projectWithSlug = data.project.find(project => project.slug === targetSlug);

    if (projectWithSlug) {
        //   console.log("Found project:", projectWithSlug);
        document.getElementById('title').textContent = projectWithSlug.title;
        document.getElementById('date').textContent = projectWithSlug.date;
        document.getElementById('as').textContent = projectWithSlug.as;
        document.getElementById('res').textContent = projectWithSlug.res;
        document.getElementById('nextProject').textContent = projectWithSlug.next;
        document.getElementById('com').textContent = projectWithSlug.com;

        const nextSlug = document.getElementById('href-slug');
        
        const test = base_url+"/work-detail.html?slug=" +projectWithSlug.nextSlug;
        nextSlug.href = test;
        var elements = document.getElementsByClassName('projectTitle');
        // Loop through the selected elements and change their text content
        for (var i = 0; i < elements.length; i++) {
            elements[i].textContent = projectWithSlug.com; // Replace 'New Text Here' with the text you want to set
        }

       
       
    } else {
      console.log("Project with the specified slug not found.");
    }

    const social = document.getElementById('social');
    const socialData = data.social;
    socialData.forEach(item => {
        const liItem = document.createElement('li');
        liItem.className = 'hover-target';

        liItem.innerHTML = `
            <a href="${item.url}" target="_blank">${item.name}</a>`;
        social.appendChild(liItem);
    });

    const miniSocial = document.getElementById('miniSocial');
    socialData.forEach(items => {
        const item = document.createElement('li');
        item.className = 'hover-target';
        item.innerHTML = `
            <a href="${items.url}" target="_blank">${items.mini}</a>`;
        miniSocial.appendChild(item);
    });

    const workImage = document.getElementById('workImages');
    const imageSlug = data.imageDetails[targetSlug]
    // imageSlug.forEach(i=>{
    //     const item = document.createElement('div');
    //     item.className = 'img-item';
    //     item.innerHTML = `
    //         <img src="${i.url}" class="img-fluid" alt="">`;
    //     workImage.appendChild(item);
    // })
  })
  .catch(error => {
    console.error("Error loading JSON data:", error);
  });