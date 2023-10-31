 fetch('assets/text.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('title').textContent = data.title;
            document.getElementById('summary').textContent = data.summary;
            var elements = document.getElementsByClassName('devRoles');

            // Loop through the selected elements and change their text content
            for (var i = 0; i < elements.length; i++) {
                elements[i].textContent = data.roles; // Replace 'New Text Here' with the text you want to set
            }


            const loopProject = document.getElementById('loopProject');
            const loopData = data.project;
            for (let i = 0; i < Math.min(4, loopData.length); i++) {
                const item = loopData[i];
                const folioItem = document.createElement('div');
                folioItem.className = 'folio-item col-md-6';

                folioItem.innerHTML = `
                    <div class="img-folio cursorExplore">
                        <a class="load-spiral" href="work-detail.html?slug=${item.slug}">
                            <img class="img-fluid" src="${item.img}" draggable="false" alt="">
                        </a>
                    </div>
                    <div class="text-folio text-center">
                        <h2 class="text-1">${item.com}</h2>
                        <h2 class="text-2">${item.com}</h2>
                    </div>
                `;

                loopProject.appendChild(folioItem);       
            };
            const count =  data.project.length;
            const allProjectsElement = document.getElementById('all-projects');
            if (count < 5) {
                allProjectsElement.style.display = 'none'; // Hide the element
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
        })
        .catch(error => console.error('Error loading JSON:', error));