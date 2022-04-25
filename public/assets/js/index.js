const postForm = document.getElementById('post-form');
const nameInputEl = document.getElementById('name-input');
const ageInputEl = document.getElementById('age-input');
const langInputEl = document.getElementById('lang-input');

const init = async () => {
  const response = await fetch('/api/students');
  const data = await response.json();
  console.log(data);
  var studentListEl = document.getElementById('student-list');
  data.forEach((student) => {
    studentListEl.innerHTML += `<a href="/student/${student.id}">
        <div class="card is-flex has-background-success">
            <div class="card-content has-text-dark">
                <div class="content">
                    <span>Name:</span> ${student.name}
                </div>
                <div class="content"><span>Age is:</span> ${student.age}</div>
                <div class="content"><span>Favorite languages:</span> ${
                  student.favLangs.join(', ').length
                    ? student.favLangs.join(', ')
                    : 'No fav languages!'
                }
                </div>
                <div class="content"><span>Added:</span> ${new Date(
                  student.dateCreated
                ).toDateString()}</div>
            </div>
        </div>
    </a>`;
  });
};

postForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    console.log('Prevented form action');
    const newStudent = {
      name: nameInputEl.value,
      age: ageInputEl.value,
      favLangs: langInputEl.value.split(', '),
      dateCreated: new Date(),
    };
    if (!nameInputEl.value || !ageInputEl.value)
      throw new Error('Please select a name and age');
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
});

init();
