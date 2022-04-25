const init = async () => {
  const studentId = location.pathname.split('/student/')[1];
  try {
    const response = await fetch('/api/students/' + studentId);
    const data = await response.json();
    console.log('Student found: ', data);
    var studentListEl = document.getElementById('student');
    studentListEl.innerHTML = `<div class="card is-flex has-background-success">
        <div class="card-content has-text-dark">
            <div class="content">
                <span>Name:</span> ${data.name}
            </div>
            <div class="content"><span>Age is:</span> ${data.age}</div>
            <div class="content"><span>Favorite languages:</span> ${
            data.favLangs.join(', ').length
                ? data.favLangs.join(', ')
                : 'No fav languages!'
            }
            </div>
            <div class="content"><span>Added:</span> ${new Date(
            data.dateCreated
            ).toDateString()}</div>
        </div>
    </div>
  `;
  } catch (err) {
    console.log('Cant get data from db!');
  }
};

init();
