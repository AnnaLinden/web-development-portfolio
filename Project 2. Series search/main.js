'use strict';
const search_field = document.getElementById('search_field');
const button = document.getElementById('button');
const result_box = document.getElementById('result_box');

//after pressing the button
button.addEventListener('click', function () {
    console.log("button pressed");
    const search_word = search_field.value;
    // console.log(search_word);
    // send request to API
    const search_result = document.getElementById('search_result');
    search_result.innerHTML = `The results of the search "${search_word}".`;

    fetch('https://api.tvmaze.com/search/shows?q=' +
        search_word)
        .then(function (answer) {
            return answer.json();
        }).then(function (tvseries) {
            console.log(tvseries);
        appendData(tvseries);
    }).catch(function (error) {       // errors displayed to the console
        console.log(error);
    });

});

document.getElementById('button').addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('button').click();
    }
});

function appendData(tvseries) {
    const main_event = document.getElementById('result_box');
    main_event.innerHTML = ''; //empty result box before the next search

    if (tvseries.length == 0) {
        main_event.innerHTML = `  <div id="front_presentation" style="width:100%!important">
                <h1>No result</h1>

                <figure>
                <img src="100x200.png" alt="404 nothing was found"/>
                </figure>
                <h4>Unfortunately there was nothing found with the search word "${search_field.value}"</h4>
            </div>`;
    } else {

        for (let i = 0; i < tvseries.length; i++) {

            const div = document.createElement('div');
            div.setAttribute('id', 'front_presentation');
            const h3 = document.createElement('h3');
            const h6 = document.createElement('h6');
            h6.setAttribute('class', 'h6');
            h3.setAttribute('class', 'h3');
            const genre = document.createElement('p');
            genre.setAttribute('class', 'margin');
            const summary = document.createElement('p');
            const rating = document.createElement('p');
            const img = document.createElement('img');
            const link = document.createElement('p');
            link.setAttribute('class', 'links');
            const premier = document.createElement('p');
            premier.setAttribute('class', 'premiere');
            summary.setAttribute('class', 'synopsis');
            rating.setAttribute('class', 'rating');
            const a1 = document.createElement('a');
            const officialsites = document.createElement("p");
            div.innerHTML = '';

            div.appendChild(h3);
            div.appendChild(h6);
            main_event.appendChild(div);

            if (`${tvseries[i].show.image}` == 'null') {
                img.src = `100x200.png`;
                img.alt = 'image';
                img.setAttribute('class', 'clicking');
                div.appendChild(img);
            } else {
                
                if (`${tvseries[i].show.officialSite}` == "null") {
                    img.src = `${tvseries[i].show.image.medium}`;
                    img.alt = 'picture';
                    img.setAttribute('class', 'clicking');
                    div.appendChild(img);
                } else {
                    a1.setAttribute('href', `${tvseries[i].show.officialSite}`);
                    a1.setAttribute("title", `${tvseries[i].show.officialSite}`)
                    a1.appendChild(img);
                    img.src = `${tvseries[i].show.image.medium}`;
                    img.alt = 'picture';
                    img.setAttribute('class', 'clicking');
                    div.appendChild(a1);
                }
            }
            h3.innerHTML = `<b>${tvseries[i].show.name} </b> `;
            h6.innerHTML = `${tvseries[i].show.type}, ${tvseries[i].show.language}`;

            genre.innerHTML = `<b>Genre:</b> ${tvseries[i].show.genres.join(' | ')} <br> `;
            div.appendChild(genre);

            if (`${tvseries[i].show.premiered}` == 'null') {
                premier.innerHTML = '';
                div.appendChild(premier);
            } else {
                premier.innerHTML = `${tvseries[i].show.premiered}`;
                div.appendChild(premier);
            }

            if (`${tvseries[i].show.summary}` == 'null') {
                summary.innerHTML = '';
                div.appendChild(summary);
            } else {
                summary.innerHTML += `${tvseries[i].show.summary}`;
                div.appendChild(summary);
            }

            if (`${tvseries[i].show.rating.average}` == 'null') {
                rating.innerHTML = '';
                div.append(rating);
            } else {
                rating.innerHTML = `${tvseries[i].show.rating.average} ★`;
                div.append(rating);
            }

            if (`${tvseries[i].show.officialSite}` == "null") {
                officialsites.innerHTML = "";
                div.appendChild(officialsites);

            } else {
                const address = document.createElement("a");
                const href = address.href = `${tvseries[i].show.officialSite}`;
                const href2 = href.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
                const href3 = href2.substring(0, href2.indexOf('.'));
                const href4 = href3.charAt(0).toUpperCase() + href3.slice(1);
                officialsites.innerHTML = `Official page: <br> <a href="${tvseries[i].show.officialSite}" class="links" title="${tvseries[i].show.officialSite}">${href4}</a>`;
                console.log(tvseries[i].show.officialSite);
                div.appendChild(officialsites);
            }

            if (`${tvseries[i].show.url}` == 'null') {
                link.innerHTML = '';
                div.appendChild(link);
            } else {
                link.innerHTML = `<a class="links" href="${tvseries[i].show.url}" title="More information can be found on TVmaze">Click to get more information</a>`;

                const dialog = document.createElement('DIALOG');
                dialog.setAttribute('class', 'myDialog');
                const closeButton = document.createElement('button');
                closeButton.innerText = 'close';
                const iframe = document.createElement("IFRAME");
                iframe.setAttribute('src', `${tvseries[i].show.url}`);
                dialog.appendChild(closeButton);
                dialog.appendChild(iframe);
                link.onmouseover = function() {openDialog()};
                closeButton.onclick = function() {closeDialog()};

                function openDialog(){
                    dialog.show();
                }
                function closeDialog(){
                    dialog.close();
                }
                div.appendChild(link);
                div.appendChild(dialog);
            }

            search_field.value = '';// empties the search field
            //console.log("search emptied")
        }
    }
    const body2 = document.querySelector('body');
}

//search with the enter button
const input2 = document.getElementById('search_field');

// Execute a function when the user releases a key on the keyboard
input2.addEventListener('keyup', function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById('button').click();
    }
});


