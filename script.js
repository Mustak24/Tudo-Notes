
const main = document.getElementById("main");
const Note_heading = document.getElementById("note_heading");
const Note_about = document.getElementById("note_about");
const Note = document.getElementById('Note')
var main_html;

if (localStorage.getItem('data')) {
    let data = localStorage.getItem('data')
    main.innerHTML = data;
    main_html = data;
} else {
    main_html = [main.innerHTML];
}

function new_note_start_anime(mode) {
    Note.style.opacity = '1';
    Note.style.transform = 'scale(1)';
    main.style.filter = 'blur(5px)';
    if (mode) document.getElementById('save_but').textContent = 'Add';
    else document.getElementById('save_but').textContent = 'Save Change';
}

function new_note_end_anime(x) {
    Note.style.opacity = '0';
    Note.style.transform = 'scale(0)';
    main.style.filter = 'blur(0)';
}

function save_note() {
    let heading = Note_heading.value;
    let note = Note_about.value;
    new_note_end_anime();
    if (Note.querySelector('button').textContent == 'Save') return [heading, note];

    temp_html = `
    <div class='card'>
    <div class="flex flex_top card_face">
    <h2>${heading}</h2>
    <p>${note}</p>
    <button class="close flex" onclick="card_opetion()">:</button>   
    </div>
    <div class='card_back flex'>
    <button class='button' onclick='card_back()'>Back</button>
    <button class='button' onclick='card_edit()'>Edit</button>
    <button class='button' onclick='card_remove()' style='background-color: red; color: white;'>Delete</button>
    </div>
    </div>
    `
    main_html.push(temp_html);
    main.innerHTML += temp_html;
    Note_about.value = ''; Note_heading.value = '';
    localStorage.setItem('data', main_html)
}

function card_opetion() {
    let active_card = document.activeElement.parentElement.parentElement;
    active_card.style.transform = 'rotateY(180deg)';

    main_html = [main.innerHTML]
    localStorage.setItem('data', main_html)
}

function card_remove() {
    let active_card = document.activeElement.parentElement.parentElement;
    if (confirm('Do you want to delete Note'))
        active_card.remove();
    main_html = [main.innerHTML]
    localStorage.setItem(main_html)
}

function card_edit() {
    let active_card = document.activeElement.parentElement.previousElementSibling;
    new_note_start_anime();
    Note.querySelector('button').textContent = 'Save';
    Note.addEventListener('click', (e) => {
        if (e.target == Note.querySelector('button')) {
            let text = save_note();
            active_card.children[0].innerHTML = text[0];
            active_card.children[1].innerHTML = text[1];
            Note.querySelector('button').textContent = 'Add';
            Note_about.value = ''; Note_heading.value = '';
            active_card.parentElement.style.transform = 'rotateY(0deg)';
            localStorage.setItem('data', main.innerHTML);
        }
    });
}

function card_back() {
    let active_card = document.activeElement.parentElement.parentElement;
    active_card.style.transform = 'rotateY(0deg)';
    localStorage.setItem('data', main.innerHTML)
}
