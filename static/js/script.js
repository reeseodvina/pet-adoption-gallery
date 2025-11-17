
//calendar function
function getDay(date) {
    return date.getDay(); 
}

function eventCalendar(elem, year, month) {
    const mon = month - 1; 
    const date = new Date(year, mon, 1);
    const pad = n => (n < 10 ? "0" + n : n);

    let table = `
        <table>
        <caption>${date.toLocaleString('default', { month: 'long' })} ${year}</caption>
        <tr>
            <th>Sunday</th><th>Monday</th><th>Tuesday</th>
            <th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th>
        </tr><tr>
    `;

    // Empty cells before the 1st day
    for (let i = 0; i < getDay(date); i++) {
        table += '<td></td>';
    }

    // Generate days of the month
    while (date.getMonth() === mon) {
        const fullDate = `${year}-${pad(month)}-${pad(date.getDate())}`;
        table += `<td data-date="${fullDate}">${date.getDate()}</td>`;

        // If it's Saturday and not the last day, start a new row
        if (getDay(date) === 6 && new Date(year, mon, date.getDate() + 1).getMonth() === mon) {
            table += '</tr><tr>';
        }

        date.setDate(date.getDate() + 1);
    }

    // Fill remaining cells of the last week
    if (getDay(new Date(year, mon + 1, 0)) !== 6) {
        for (let i = getDay(new Date(year, mon + 1, 0)) + 1; i <= 6; i++) {
            table += '<td></td>';
        }
    }

    // Always close the last row and table
    table += '</tr></table>';

    elem.innerHTML = table;

    window.openScheduleForm = (date) => {
            var selectedDate = document.getElementById('selected-date')
            var scheduleContent= document.getElementById('schedule-content');
            var scheduleForm = document.getElementById('schedule-form');

            selectedDate.textContent = `Selected date: ${date}`
            scheduleForm.classList.remove("inactive");
            scheduleForm.classList.add("active");
        };

    elem.querySelectorAll("td[data-date]").forEach(td => {
        td.addEventListener('click',() => openScheduleForm(td.dataset.date));
    });

   
}

document.addEventListener("DOMContentLoaded", () => {
    var calendarSpace = document.getElementById("calendar-space");
    var scheduleContent= document.getElementById('schedule-content');
    var scheduleForm = document.getElementById('schedule-form');
            
    
    var today = new Date();
    eventCalendar(calendarSpace, today.getFullYear(), today.getMonth() + 1);

    var closeScheduleForm = document.getElementById("close-schedule-form");

    closeScheduleForm.addEventListener("click", () => {
        scheduleForm.classList.add("inactive")
        scheduleForm.classList.remove("active");
    });
});

//Calendar form

function meetPet(event) {
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');

    if (!email.value && !phone.value) {
        alert('Email or phone number required');
        event.preventDefault();
        return;
    };

    var pickPet = document.getElementById('pick-pet');

    if (!pickPet.value) {
        alert("Pick a friend to meet");
        event.preventDefault();
        return;
    };
    
}

    

    





//see more dropdown here
function openTab() {
    var addedList = document.getElementById('added-list');
    addedList.classList.toggle("inactive");
    addedList.classList.toggle("active");

    var seeMore = document.querySelector(".see-more");
    seeMore.classList.toggle("inactive");
    seeMore.classList.toggle("active");

    var morePets = document.getElementById("more-pets")
    if (addedList.classList.contains("active")) {
        morePets.textContent = "See Less";
    } else {
        morePets.textContent = "See More";
    }
}


//Scroll content


document.addEventListener('DOMContentLoaded', () => {
    var content = document.querySelector(".content");
    var rightArrow = document.getElementById('right-arrow');
    var leftArrow = document.getElementById('left-arrow');

    var scrollAmount = 350;
    if (content && rightArrow && leftArrow) {
        leftArrow.addEventListener('click', () => {
            content.scrollBy({
                left: -scrollAmount,
                behavior: "smooth"
            })
        });

        rightArrow.addEventListener('click', () => {
            content.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            })
        });

        setInterval(()=> {
            content.scrollBy({ left: 350,
                behavior: "smooth"});
        }, 4000);
    }
})

//This is for the quiz
// Quiz Data Structure
const quizData = {
    sections: [
        {
            name: "Lifestyle",
            questions: [
                {
                    question: "How would you describe your daily schedule?",
                    answers: [
                        { text: "Very active and outdoorsy", scores: { adventurous: 3, cuddly: 1 } },
                        { text: "Moderate activity, some outdoors", scores: { roommate: 2, adventurous: 1 } },
                        { text: "Mostly indoors and relaxed", scores: { cuddly: 2, roommate: 2 } },
                        { text: "Unpredictable and varied", scores: { spooky: 2, adventurous: 1 } }
                    ]
                },
                {
                    question: "What's your living situation?",
                    answers: [
                        { text: "House with yard", scores: { adventurous: 3, roommate: 1 } },
                        { text: "Apartment with space", scores: { roommate: 2, cuddly: 2 } },
                        { text: "Small apartment", scores: { cuddly: 3, spooky: 1 } },
                        { text: "Changing/temporary", scores: { spooky: 2 } }
                    ]
                },
                {
                    question: "How much time can you dedicate to a pet daily?",
                    answers: [
                        { text: "Several hours of active time", scores: { adventurous: 3 } },
                        { text: "A few hours of interaction", scores: { roommate: 2, cuddly: 1 } },
                        { text: "Limited but quality time", scores: { cuddly: 2, roommate: 1 } },
                        { text: "Variable schedule", scores: { spooky: 2 } }
                    ]
                },
                {
                    question: "What's your experience with pets?",
                    answers: [
                        { text: "Extensive experience", scores: { adventurous: 2, spooky: 2 } },
                        { text: "Some experience", scores: { roommate: 2 } },
                        { text: "First-time pet owner", scores: { cuddly: 2, roommate: 1 } },
                        { text: "Ready for a challenge", scores: { spooky: 3, adventurous: 1 } }
                    ]
                },
                {
                    question: "How do you feel about pet maintenance?",
                    answers: [
                        { text: "Love grooming and care routines", scores: { cuddly: 3 } },
                        { text: "Don't mind regular upkeep", scores: { adventurous: 2, roommate: 1 } },
                        { text: "Prefer low-maintenance", scores: { roommate: 3 } },
                        { text: "Up for unique challenges", scores: { spooky: 3 } }
                    ]
                }
            ]
        },
        {
            name: "Personality",
            questions: [
                {
                    question: "What kind of companionship are you seeking?",
                    answers: [
                        { text: "Adventure buddy", scores: { adventurous: 3 } },
                        { text: "Loyal sidekick", scores: { cuddly: 2, adventurous: 1 } },
                        { text: "Independent coexistence", scores: { roommate: 3 } },
                        { text: "Mysterious connection", scores: { spooky: 3 } }
                    ]
                },
                {
                    question: "How do you handle unexpected situations?",
                    answers: [
                        { text: "Embrace the chaos!", scores: { adventurous: 2, spooky: 2 } },
                        { text: "Stay calm and adapt", scores: { roommate: 2 } },
                        { text: "Prefer routine and predictability", scores: { cuddly: 2 } },
                        { text: "Find it exciting", scores: { spooky: 2, adventurous: 1 } }
                    ]
                },
                {
                    question: "Your ideal weekend activity?",
                    answers: [
                        { text: "Hiking or outdoor adventure", scores: { adventurous: 3 } },
                        { text: "Relaxing at home", scores: { cuddly: 3 } },
                        { text: "Social gatherings", scores: { roommate: 2 } },
                        { text: "Something unusual", scores: { spooky: 3 } }
                    ]
                },
                {
                    question: "How social is your lifestyle?",
                    answers: [
                        { text: "Very social, lots of visitors", scores: { roommate: 3, adventurous: 1 } },
                        { text: "Moderately social", scores: { cuddly: 2, roommate: 1 } },
                        { text: "Prefer quiet and privacy", scores: { spooky: 2, cuddly: 1 } },
                        { text: "Varies greatly", scores: { spooky: 1 } }
                    ]
                },
                {
                    question: "What draws you to animals?",
                    answers: [
                        { text: "Their energy and playfulness", scores: { adventurous: 3 } },
                        { text: "Unconditional love", scores: { cuddly: 3 } },
                        { text: "Their independence", scores: { roommate: 3 } },
                        { text: "Their unique personalities", scores: { spooky: 3 } }
                    ]
                }
            ]
        },
        {
            name: "Preferences",
            questions: [
                {
                    question: "What size pet appeals to you?",
                    answers: [
                        { text: "Large and sturdy", scores: { adventurous: 3 } },
                        { text: "Medium-sized", scores: { roommate: 2 } },
                        { text: "Small and portable", scores: { cuddly: 2 } },
                        { text: "Size doesn't matter", scores: { spooky: 1, roommate: 1 } }
                    ]
                },
                {
                    question: "How much noise can you tolerate?",
                    answers: [
                        { text: "Love an expressive pet", scores: { adventurous: 2 } },
                        { text: "Some noise is fine", scores: { roommate: 2 } },
                        { text: "Prefer quiet companions", scores: { cuddly: 2, spooky: 1 } },
                        { text: "Mysterious sounds are cool", scores: { spooky: 3 } }
                    ]
                },
                {
                    question: "What's your tolerance for mess?",
                    answers: [
                        { text: "Don't mind the chaos", scores: { adventurous: 2, spooky: 2 } },
                        { text: "Can handle some mess", scores: { roommate: 2 } },
                        { text: "Prefer tidy", scores: { cuddly: 2 } },
                        { text: "Unconventional mess is okay", scores: { spooky: 2 } }
                    ]
                },
                {
                    question: "Budget for pet care?",
                    answers: [
                        { text: "Ready for any expense", scores: { adventurous: 1, spooky: 1 } },
                        { text: "Moderate budget", scores: { roommate: 2, cuddly: 1 } },
                        { text: "Cost-conscious", scores: { roommate: 2 } },
                        { text: "Flexible for right pet", scores: { spooky: 1, cuddly: 1 } }
                    ]
                },
                {
                    question: "Long-term commitment level?",
                    answers: [
                        { text: "Lifetime companion", scores: { cuddly: 3, adventurous: 2 } },
                        { text: "Many years together", scores: { roommate: 2 } },
                        { text: "Open to see how it goes", scores: { spooky: 1 } },
                        { text: "Fully committed", scores: { adventurous: 2, cuddly: 2 } }
                    ]
                }
            ]
        }
    ]
};

// Pet type descriptions
const petTypes = {
    adventurous: {
        title: "The Adventurous Pet",
        description: "You're perfect for an energetic companion who loves exploration and outdoor activities! Your active lifestyle pairs wonderfully with pets who need lots of exercise and mental stimulation.",
        
    },
    spooky: {
        title: "The Curious Pet",
        description: "You appreciate unique personalities and mysterious charm! You're ideal for pets with distinctive characters who march to their own beat and bring something special to your life.",
       
    },
    roommate: {
        title: "The Roommate Pet",
        description: "You're looking for an independent companion who respects personal space! You're perfect for pets who are low-maintenance and content with parallel companionship.",
       
    },
    cuddly: {
        title: "The Cuddly Pet",
        description: "You want a loving, affectionate companion for cozy moments! You're ideal for pets who thrive on physical affection and quality time with their humans.",

    }
};

// Quiz State
let currentSection = 0;
let currentQuestion = 0;
let scores = {
    adventurous: 0,
    spooky: 0,
    roommate: 0,
    cuddly: 0
};

// Initialize Quiz
function initQuiz() {
    updateProgress();
    displayQuestion();
}

// Update Progress Bar
function updateProgress() {
    const paws = ['paw1', 'paw2', 'paw3'];
    paws.forEach((paw, index) => {
        const element = document.getElementById(paw);
        if (index < currentSection) {
            element.classList.add('completed');
        } else if (index === currentSection) {
            element.classList.add('active');
        } else {
            element.classList.remove('completed', 'active');
        }
    });
}

// Display Current Question
function displayQuestion() {
    const section = quizData.sections[currentSection];
    const questionData = section.questions[currentQuestion];
    
    document.getElementById('question-text').textContent = questionData.question;
    
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    questionData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.onclick = () => selectAnswer(index);
        answersContainer.appendChild(button);
    });
}

// Handle Answer Selection
function selectAnswer(answerIndex) {
    const section = quizData.sections[currentSection];
    const questionData = section.questions[currentQuestion];
    const selectedAnswer = questionData.answers[answerIndex];
    
    // Update scores
    for (let type in selectedAnswer.scores) {
        scores[type] += selectedAnswer.scores[type];
    }
    
    // Move to next question
    currentQuestion++;
    
    // Check if section is complete
    if (currentQuestion >= section.questions.length) {
        currentSection++;
        currentQuestion = 0;
        
        // Check if quiz is complete
        if (currentSection >= quizData.sections.length) {
            completeQuiz();
            return;
        }
        
        updateProgress();
    }
    
    displayQuestion();
}

// Complete Quiz and Navigate to Results
function completeQuiz() {
    // Determine winning pet type
    let maxScore = 0;
    let winningType = '';
    
    for (let type in scores) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            winningType = type;
        }
    }
    
    // Store result and navigate
    localStorage.setItem('petType', winningType);
    localStorage.setItem('scores', JSON.stringify(scores));
    window.location.href = 'results.html';
}

// Initialize Results Page
function initResults() {
    const petType = localStorage.getItem('petType') || 'cuddly';
    const result = petTypes[petType];
    
    document.getElementById('result-type').textContent = result.title;
    document.getElementById('result-description').textContent = result.description;
    
    // Fetch pets from Petfinder API
    fetchPets(petType);
}

// Fetch Pets from Recue Groups API
async function fetchPets(petType) {
    const matchesContainer = document.getElementById('matches-container');
    
    try {
    
        /*
        const tokenResponse = await fetch('https://api.rescuegroups.org/v5', {
            method: 'POST',
            body: 'grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        const tokenData = await tokenResponse.json();
        const token = tokenData.access_token;
        
        const response = await fetch('https://api.petfinder.com/v2/animals?location=33467&limit=10', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        displayMatches(data.animals, petType);
        */
        
        // Mock data for demonstration
        const mockPets = generateMockPets(petType);
        displayMatches(mockPets, petType);
        
    } catch (error) {
        matchesContainer.innerHTML = '<p class="error">Unable to load pets. Please try again later.</p>';
        console.error('Error fetching pets:', error);
    }
}

// Generate Mock Pet Data
function generateMockPets(petType) {
    const petNames = ['Luna', 'Max', 'Bella', 'Charlie', 'Whiskers', 'Shadow', 'Mittens', 'Rocky'];
    const breeds = {
        adventurous: ['Labrador Retriever', 'German Shepherd', 'Australian Shepherd', 'Border Collie'],
        spooky: ['Black Cat', 'Siamese', 'Maine Coon', 'Sphynx'],
        roommate: ['British Shorthair', 'Ragdoll', 'Persian', 'Russian Blue'],
        cuddly: ['Golden Retriever', 'Cavalier King Charles Spaniel', 'Ragdoll Cat', 'Poodle']
    };
    
    const mockPets = [];
    const breedList = breeds[petType] || breeds.cuddly;
    
    for (let i = 0; i < 8; i++) {
        mockPets.push({
            name: petNames[i],
            breed: breedList[i % breedList.length],
            age: Math.floor(Math.random() * 10) + 1,
            distance: Math.floor(Math.random() * 30) + 1,
            relevance: 100 - (i * 10)
        });
    }
    
    return mockPets;
}

// Display Pet Matches
function displayMatches(pets, petType) {
    const matchesContainer = document.getElementById('matches-container');
    matchesContainer.innerHTML = '';
    
    if (!pets || pets.length === 0) {
        matchesContainer.innerHTML = '<p>No pets found in your area. Try expanding your search!</p>';
        return;
    }
    
    pets.forEach((pet, index) => {
        const petCard = document.createElement('div');
        petCard.className = 'pet-card';
        
        const relevance = pet.relevance || (100 - (index * 10));
        
        petCard.innerHTML = `
            <div class="pet-card-header">
                <h3>${pet.name}</h3>
                <span class="relevance">${relevance}% Match</span>
            </div>
            <p class="pet-breed">${pet.breed || 'Mixed Breed'}</p>
            <p class="pet-details">Age: ${pet.age || 'Unknown'} years • Distance: ${pet.distance || 'N/A'} miles</p>
            <div class="pet-icon">${getPetIcon(petType)}</div>
        `;
        
        matchesContainer.appendChild(petCard);
    });
}

// Get Pet Icon Based on Type
function getPetIcon(petType) {
    const icons = {
        adventurous: '🐕',
        spooky: '🐱',
        roommate: '🐈',
        cuddly: '🐶'
    };
    return icons[petType] || '🐾';
}

// Initialize appropriate page
if (window.location.pathname.includes('quiz.html')) {
    document.addEventListener('DOMContentLoaded', initQuiz);
} else if (window.location.pathname.includes('results.html')) {
    document.addEventListener('DOMContentLoaded', initResults);
}
