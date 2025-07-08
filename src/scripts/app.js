// This file contains the JavaScript code for the To-Do application. 
// It handles the functionality such as adding, removing, and marking tasks as complete.

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task'); // id corregido
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });
    taskList.addEventListener('click', handleTaskClick);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = document.createElement('li');
            taskItem.textContent = taskText;
            taskItem.classList.add('task-item');

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-task-button');

            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);
            taskInput.value = '';
        }
    }

    function handleTaskClick(event) {
        if (event.target.classList.contains('remove-task-button')) {
            const taskItem = event.target.parentElement;
            taskList.removeChild(taskItem);
        } else if (event.target.classList.contains('task-item')) {
            event.target.classList.toggle('completed');
        }
    }
});

// --- Test de Carrera Ideal (una pregunta a la vez) ---
const careerQuestions = [
    {
        question: "¿Qué asignatura disfrutas más en la escuela?",
        options: [
            { text: "Cálculo, física o robótica", value: "Ingeniería" },
            { text: "Biología, anatomía o química médica", value: "Medicina" },
            { text: "Historia universal, filosofía o derecho", value: "Derecho" },
            { text: "Dibujo, música, teatro o diseño", value: "Artes" }
        ]
    },
    {
        question: "¿En qué tipo de actividades extraescolares participas o te gustaría participar?",
        options: [
            { text: "Club de ciencias, olimpiadas matemáticas o programación", value: "Ingeniería" },
            { text: "Voluntariado en hospitales, brigadas de salud o primeros auxilios", value: "Medicina" },
            { text: "Debates, modelo de Naciones Unidas o concursos de oratoria", value: "Derecho" },
            { text: "Taller de pintura, música, danza o fotografía", value: "Artes" }
        ]
    },
    {
        question: "¿Qué tipo de problemas disfrutas resolver?",
        options: [
            { text: "Desafíos técnicos, construir o reparar cosas", value: "Ingeniería" },
            { text: "Ayudar a personas enfermas o investigar sobre salud", value: "Medicina" },
            { text: "Resolver conflictos, defender ideas o analizar leyes", value: "Derecho" },
            { text: "Crear obras originales, expresar emociones o innovar en arte", value: "Artes" }
        ]
    },
    {
        question: "¿Qué ambiente laboral te atrae más?",
        options: [
            { text: "Laboratorios, empresas tecnológicas o fábricas", value: "Ingeniería" },
            { text: "Hospitales, clínicas o laboratorios médicos", value: "Medicina" },
            { text: "Juzgados, despachos, instituciones públicas", value: "Derecho" },
            { text: "Estudios creativos, galerías, escenarios o medios digitales", value: "Artes" }
        ]
    },
    {
        question: "¿Qué herramienta te gustaría dominar?",
        options: [
            { text: "Software de diseño asistido, calculadoras avanzadas", value: "Ingeniería" },
            { text: "Microscopio, estetoscopio o instrumental médico", value: "Medicina" },
            { text: "Códigos legales, bases de datos jurídicas", value: "Derecho" },
            { text: "Tableta gráfica, cámara profesional o instrumentos musicales", value: "Artes" }
        ]
    },
    {
        question: "¿Qué tipo de libros o películas prefieres?",
        options: [
            { text: "Ciencia ficción, tecnología o inventos", value: "Ingeniería" },
            { text: "Historias de superación, salud o biografías médicas", value: "Medicina" },
            { text: "Dramas legales, política o historia", value: "Derecho" },
            { text: "Arte, creatividad, biografías de artistas", value: "Artes" }
        ]
    }
];

const engineeringQuestions = [
    {
        question: "¿Qué prefieres?",
        options: [
            { text: "Construir máquinas, robots o estructuras", value: "Ingeniería Mecánica" },
            { text: "Programar, analizar datos o crear software", value: "Ingeniería en Sistemas" },
            { text: "Resolver problemas eléctricos o electrónicos", value: "Ingeniería Eléctrica" },
            { text: "Diseñar procesos químicos o materiales", value: "Ingeniería Química" }
        ]
    },
    {
        question: "¿En qué ambiente te gustaría trabajar?",
        options: [
            { text: "Talleres, fábricas o laboratorios de prototipos", value: "Ingeniería Mecánica" },
            { text: "Empresas de tecnología, startups o laboratorios de software", value: "Ingeniería en Sistemas" },
            { text: "Plantas eléctricas, empresas de energía o telecomunicaciones", value: "Ingeniería Eléctrica" },
            { text: "Industrias químicas, farmacéuticas o de alimentos", value: "Ingeniería Química" }
        ]
    }
];

const testContent = document.getElementById('career-test-content');
const testResult = document.getElementById('career-test-result');

if (testContent) {
    let current = 0;
    let answers = [];
    let started = false;
    showCover();

    function showCover() {
        testContent.innerHTML = `
            <div class="test-cover fade-in">
                <h2 class="cover-title">Descubre tu carrera ideal</h2>
                <p class="cover-desc">Descubre qué carrera profesional se adapta mejor a tus intereses y habilidades. ¡Responde unas preguntas y conoce tu resultado!</p>
                <button id="start-test" class="option-btn" style="margin-top:28px;">Comenzar</button>
            </div>
        `;
        testResult.innerHTML = '';
        document.getElementById('start-test').onclick = function() {
            started = true;
            current = 0;
            answers = [];
            showQuestion('fade-in');
        };
    }

    function showQuestion(animation = 'fade-in') {
        if (!started) return showCover();
        if (current < careerQuestions.length) {
            const q = careerQuestions[current];
            testContent.innerHTML = `
                <div class="test-question ${animation}">
                    <h2>Pregunta ${current + 1} de ${careerQuestions.length}</h2>
                    <p>${q.question}</p>
                    <div class="test-options">
                        ${q.options.map((opt, i) => `
                            <button class="option-btn" data-value="${opt.value}">${opt.text}</button>
                        `).join('')}
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${(100 * (current + 1) / careerQuestions.length)}%"></div>
                    </div>
                </div>
            `;
            setTimeout(() => {
                document.querySelector('.test-question').classList.remove('fade-in');
            }, 500);
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.onclick = function() {
                    // Animación de salida
                    const qDiv = document.querySelector('.test-question');
                    qDiv.classList.add('fade-out');
                    setTimeout(() => {
                        answers.push(this.getAttribute('data-value'));
                        current++;
                        showQuestion('fade-in');
                    }, 400);
                };
            });
        } else {
            // Mostrar resultado
            testContent.innerHTML = '';
            testResult.innerHTML = '';
            setTimeout(() => {
                const counts = {};
                answers.forEach(ans => { counts[ans] = (counts[ans] || 0) + 1; });
                const career = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
                if (career === 'Ingeniería') {
                    // Mostrar pantalla intermedia antes del subtest
                    testContent.innerHTML = `
                        <div class="test-question fade-in">
                            <div class="career-mascot">
                                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Robot ingeniero" width="120" height="120" />
                            </div>
                            <h2>¡Tu perfil es ideal para Ingeniería!</h2>
                            <p>¿Quieres responder más preguntas para descubrir qué rama de ingeniería es la mejor para ti?</p>
                            <div class="test-options">
                                <button id="yes-eng" class="option-btn">Sí, quiero saber la rama</button>
                                <button id="no-eng" class="option-btn">No, mostrar resultado así</button>
                            </div>
                        </div>
                    `;
                    testResult.innerHTML = '';
                    document.getElementById('yes-eng').onclick = function() {
                        current = 0;
                        let engAnswers = [];
                        function showEngQuestion(animation = 'fade-in') {
                            if (current < engineeringQuestions.length) {
                                const q = engineeringQuestions[current];
                                testContent.innerHTML = `
                                    <div class="test-question ${animation}">
                                        <h2>Pregunta ${current + 1} de ${engineeringQuestions.length}</h2>
                                        <p>${q.question}</p>
                                        <div class="test-options">
                                            ${q.options.map((opt, i) => `
                                                <button class="option-btn" data-value="${opt.value}">${opt.text}</button>
                                            `).join('')}
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress" style="width: ${(100 * (current + 1) / engineeringQuestions.length)}%"></div>
                                        </div>
                                    </div>
                                `;
                                setTimeout(() => {
                                    document.querySelector('.test-question').classList.remove('fade-in');
                                }, 500);
                                document.querySelectorAll('.option-btn').forEach(btn => {
                                    btn.onclick = function() {
                                        const qDiv = document.querySelector('.test-question');
                                        qDiv.classList.add('fade-out');
                                        setTimeout(() => {
                                            engAnswers.push(this.getAttribute('data-value'));
                                            current++;
                                            showEngQuestion('fade-in');
                                        }, 400);
                                    };
                                });
                            } else {
                                // Mostrar resultado de ingeniería
                                const engCounts = {};
                                engAnswers.forEach(ans => { engCounts[ans] = (engCounts[ans] || 0) + 1; });
                                const engCareer = Object.keys(engCounts).reduce((a, b) => engCounts[a] > engCounts[b] ? a : b);
                                const mascot = getCareerMascot(engCareer);
                                // Porcentajes de ramas de ingeniería
                                const totalEng = engAnswers.length;
                                let percentEngHTML = '<div class="percent-list">';
                                Object.keys(engCounts).forEach(key => {
                                    const percent = Math.round((engCounts[key] / totalEng) * 100);
                                    percentEngHTML += `
                                        <div class=\"percent-bar-row\">
                                            <span class=\"percent-label\">${key}</span>
                                            <div class=\"percent-bar\"><div class=\"percent-bar-inner\" style=\"width:${percent}%;\"></div></div>
                                            <span class=\"percent-value\">${percent}%</span>
                                        </div>
                                    `;
                                });
                                percentEngHTML += '</div>';
                                // Porcentajes de carreras generales
                                const total = answers.length;
                                let percentHTML = '<div class="percent-list" style="margin-top:18px;">';
                                Object.keys(counts).forEach(key => {
                                    const percent = Math.round((counts[key] / total) * 100);
                                    let label = key;
                                    switch (key) {
                                        case 'Ingeniería': label = 'Ingeniería'; break;
                                        case 'Medicina': label = 'Medicina'; break;
                                        case 'Derecho': label = 'Derecho'; break;
                                        case 'Artes': label = 'Artes'; break;
                                    }
                                    percentHTML += `
                                        <div class=\"percent-bar-row\">
                                            <span class=\"percent-label\">${label}</span>
                                            <div class=\"percent-bar\"><div class=\"percent-bar-inner\" style=\"width:${percent}%;\"></div></div>
                                            <span class=\"percent-value\">${percent}%</span>
                                        </div>
                                    `;
                                });
                                percentHTML += '</div>';
                                testContent.innerHTML = '';
                                testResult.innerHTML = `
                                    <div class="career-mascot">
                                        <img src="${mascot.img}" alt="${mascot.alt}" width="120" height="120" />
                                    </div>
                                    <h2>¡Tu perfil es ideal para ${engCareer}!</h2>
                                    <h3 style="margin-top:18px;">Porcentaje de ramas de ingeniería:</h3>
                                    ${percentEngHTML}
                                    <h3 style="margin-top:28px;">Porcentaje de afinidad con todas las carreras:</h3>
                                    ${percentHTML}
                                    <button id="restart-test" class="option-btn" style="margin-top:22px;">Volver a intentarlo</button>
                                `;
                                document.getElementById('restart-test').onclick = function() {
                                    started = false;
                                    current = 0;
                                    answers = [];
                                    testResult.innerHTML = '';
                                    showCover();
                                };
                            }
                        }
                        showEngQuestion('fade-in');
                    };
                    document.getElementById('no-eng').onclick = function() {
                        const mascot = getCareerMascot('Ingeniería');
                        testContent.innerHTML = '';
                        testResult.innerHTML = `
                            <div class="career-mascot">
                                <img src="${mascot.img}" alt="${mascot.alt}" width="120" height="120" />
                            </div>
                            <h2>¡Tu perfil es ideal para Ingeniería!</h2>
                            <button id="restart-test" class="option-btn" style="margin-top:22px;">Volver a intentarlo</button>
                        `;
                        document.getElementById('restart-test').onclick = function() {
                            started = false;
                            current = 0;
                            answers = [];
                            testResult.innerHTML = '';
                            showCover();
                        };
                    };
                    return;
                }
                let careerDesc = '';
                switch (career) {
                    case 'Ingeniería': careerDesc = '¡Tu perfil es ideal para Ingeniería!'; break;
                    case 'Medicina': careerDesc = '¡Podrías destacar en Medicina!'; break;
                    case 'Derecho': careerDesc = '¡El Derecho es tu camino!'; break;
                    case 'Artes': careerDesc = '¡Las Artes son tu vocación!'; break;
                }
                const mascot = getCareerMascot(career);
                // Calcular porcentajes para todas las carreras
                const total = answers.length;
                let percentHTML = '<div class="percent-list">';
                Object.keys(counts).forEach(key => {
                    const percent = Math.round((counts[key] / total) * 100);
                    let label = key;
                    switch (key) {
                        case 'Ingeniería': label = 'Ingeniería'; break;
                        case 'Medicina': label = 'Medicina'; break;
                        case 'Derecho': label = 'Derecho'; break;
                        case 'Artes': label = 'Artes'; break;
                    }
                    percentHTML += `
                        <div class="percent-bar-row">
                            <span class="percent-label">${label}</span>
                            <div class="percent-bar"><div class="percent-bar-inner" style="width:${percent}%;"></div></div>
                            <span class="percent-value">${percent}%</span>
                        </div>
                    `;
                });
                percentHTML += '</div>';
                testResult.innerHTML = `
                    <div class="career-mascot">
                        <img src="${mascot.img}" alt="${mascot.alt}" width="120" height="120" />
                    </div>
                    <h2>${careerDesc}</h2>
                    ${percentHTML}
                    <button id="restart-test" class="option-btn" style="margin-top:22px;">Volver a intentarlo</button>
                `;
                document.getElementById('restart-test').onclick = function() {
                    started = false;
                    current = 0;
                    answers = [];
                    testResult.innerHTML = '';
                    showCover();
                };
            }, 400);
        }
    }
}

function getCareerMascot(career) {
    switch (career) {
        case 'Ingeniería':
        case 'Ingeniería Mecánica':
        case 'Ingeniería en Sistemas':
        case 'Ingeniería Eléctrica':
        case 'Ingeniería Química':
            return {
                img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                alt: 'Robot ingeniero',
                anim: '' // Sin animación final
            };
        case 'Medicina':
            return {
                img: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
                alt: 'Doctora sonriente',
                anim: 'heartbeat'
            };
        case 'Derecho':
            return {
                img: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
                alt: 'Balanza de la justicia',
                anim: 'scale'
            };
        case 'Artes':
            return {
                img: 'https://cdn-icons-png.flaticon.com/512/2721/2721048.png',
                alt: 'Paleta de arte',
                anim: 'spin'
            };
        default:
            return { img: '', alt: '', anim: '' };
    }
}