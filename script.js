
  const main = document.getElementById("main");
  const Note_heading = document.getElementById("note_heading");
  const Note_about = document.getElementById("note_about");
  const Note = document.getElementById('Note')
  var main_html;

  if(localStorage.getItem('data')){
      let data = localStorage.getItem('data').split(',')
      for(let i=1; i<data.length; i++) main.innerHTML += data[i];
      main_html = data;
  }else{
      main_html = [main.innerHTML];
  }

  function new_note(){
      Note.style.opacity = '1';
      Note.style.transform = 'scale(1)'
      main.style.filter = 'blur(5px)'
  }

  function save_note(){
      let heading = Note_heading.value;
      let note = Note_about.value;
      temp_html= `
      <div class="flex flex_top note">
          <h2>${heading}</h2>
          <p>${note}</p>
          <button class="close flex" onclick="remove()">:</button>
      </div>
      `
      main_html.push(temp_html);
      localStorage.setItem('data',main_html)

      main.innerHTML += temp_html;

      Note.style.opacity = '0';
      Note.style.transform = 'scale(0)';
      main.style.filter = 'blur(0)';
      Note_about.value = ''; Note_heading.value = '';
  }

  function remove(){
      let but = main.querySelectorAll('button')
      let active_but = document.activeElement;
      if(confirm('Do you want to deleat this Note')){
          but.forEach((But)=>{
            if(active_but == But){
              But.parentElement.remove();
            }  
          });
      }  
      main_html = [main.innerHTML]
      localStorage.setItem('data',main_html)
  }
