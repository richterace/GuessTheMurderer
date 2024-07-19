

// Pre-made questions based on categories
const questions = {
    'skin': [
        'Does the character have fair skin?',
        'Does the character have light skin?',
        'Does the character have olive skin?',
        'Does the character have dark skin?',
        'Does the character have tan skin?'
    ],
    'accessory': [
        'Does the character dont have accessory?',
        'Is the character wearing a necklace?',
        'Is the character wearing eyeglasses?',
        'Is the character wearing a watch?',
        'Is the character wearing earrings?',
        'Is the character wearing sunglasses?',
        'Is the character wearing a bracelet?',
        'Is the character wearing a scarf?'
    ],

    'gender': [
        'Is the character gender male?',
        'Is the character gender female?',

    ],

    'haircolor': [
        'Does the character have brown hair?',
        'Does the character have black hair?',
        'Does the character have blonde hair?',
        'Does the character have red hair?'
    ],

    'hairstyle': [
        'Does the character have wavy hair style?',
        'Does the character have curly hair style?',
        'Does the character have straight hair style?'
    ],
    'hairlength': [
        'Is the character bald?',
        'Does the character have short length hair?',
        'Does the character have medium length hair?',
        'Does the character have long length hair?'
    ],
    'facialhair': [
        'Does the character have facial hair?',
    ],
    'headwear': [
        'Does the character have headware?'
    ],
    'clothescolor': [
        'Is the character wearing red clothes?',
        'Is the character wearing yellow clothes?',
        'Is the character wearing green clothes?',
        'Is the character wearing purple clothes?',
        'Is the character wearing pink clothes?',
        'Is the character wearing white clothes?',
        'Is the character wearing blue clothes?',
        'Is the character wearing black clothes?'
    ]

};


// Function to show game page
function showGamePage() {
    // Show loading screen
    document.getElementById('loading-screen').style.display = 'flex';

    // Simulate loading time
    setTimeout(() => {
        // Hide loading screen
        document.getElementById('loading-screen').style.display = 'none';

        // Show game container
        document.getElementById('home').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
    }, 3000); // Adjust the time as needed
}

let userTurn = true;
let currentQuestionCategory = null;
let lies = 0;
let points = 0;
let selectedCard = null;
let score = 0;
let selectedCards = [];
let eliminatedCards = new Set();
let eliminatedCount = 0;
let userSelectedCard = null;
let aiSelectedCard = null;
let remainingCards = Array.from({ length: 20 }, (_, i) => i + 1);
let guessedCard = null; // Global variable to store the guessed card

//Functions responsible for starting the games
function selectCard(cardNumber) {
    selectedCard = cardNumber;
    document.getElementById('confirmation-modal').style.display = 'flex';
}
function confirmSelection() {
    // Hide the confirmation modal (assuming it's shown)
    document.getElementById('confirmation-modal').style.display = 'none';

    // Update the selected user's card in the right section
    const selectedCardElement = document.querySelector(`#left-section .cards .card:nth-child(${selectedCard})`);

    // Get attributes of the selected card
    const gender = selectedCardElement.querySelector('p:nth-child(2)').textContent.trim().slice(8);
    const haircolor = selectedCardElement.querySelector('p:nth-child(3)').textContent.trim().slice(12);
    const hairstyle = selectedCardElement.querySelector('p:nth-child(4)').textContent.trim().slice(12);
    const hairlength = selectedCardElement.querySelector('p:nth-child(5)').textContent.trim().slice(13);
    const facialhair = selectedCardElement.querySelector('p:nth-child(6)').textContent.trim().slice(13);
    const accessory = selectedCardElement.querySelector('p:nth-child(7)').textContent.trim().slice(11);
    const headwear = selectedCardElement.querySelector('p:nth-child(8)').textContent.trim().slice(10);
    const skin = selectedCardElement.querySelector('p:nth-child(9)').textContent.trim().slice(6);
    const clothescolor = selectedCardElement.querySelector('p:nth-child(10)').textContent.trim().slice(16);

    // Store user selected card details
    userSelectedCard = {
        gender: gender,
        haircolor: haircolor,
        hairstyle: hairstyle,
        hairlength: hairlength,
        facialhair: facialhair,
        accessory: accessory,
        headwear: headwear,
        skin: skin,
        clothescolor: clothescolor,
        imageSrc: selectedCardElement.querySelector('img').src,
        altText: selectedCardElement.querySelector('img').alt
    };

    // Update selected card in the cardChoosen area
    const cardChoosenContainer = document.querySelector('#selected-card .cardChoosen');
    const selectedCardHTML = `
        <div class="card" style="margin-right:50px; width:200px;height:300px;">
            <img src="${userSelectedCard.imageSrc}" alt="${userSelectedCard.altText}">
        </div>
        <div class="attributes" style="font-size:15px">
            <p>Gender: ${userSelectedCard.gender}</p>
            <p>Hair Color: ${userSelectedCard.haircolor}</p>
            <p>Hair Style: ${userSelectedCard.hairstyle}</p>
            <p>Hair Length: ${userSelectedCard.hairlength}</p>
            <p>Facial Hair: ${userSelectedCard.facialhair}</p>
            <p>Headwear: ${userSelectedCard.headwear}</p>
            <p>Skin: ${userSelectedCard.skin}</p>
            <p>Clothe's Color: ${userSelectedCard.clothescolor}</p>
            <p>Accessory: ${userSelectedCard.accessory}</p>
        </div>
    `;
    cardChoosenContainer.innerHTML = selectedCardHTML;

    // Display selected card section
    document.getElementById('selected-card').style.display = 'block';


    // AI selects a card randomly (between 1 to 4, similar to user's selection)
    const aiSelectedCardNumber = Math.floor(Math.random() * 20) + 1;
    const aiSelectedCardElement = document.querySelector(`#left-section .cards .card:nth-child(${aiSelectedCardNumber})`);

    // Extract the text content of each attribute and split it properly
    const aiGender = aiSelectedCardElement.querySelector('p:nth-child(2)').textContent.trim().split(': ')[1];
    const aiHairColor = aiSelectedCardElement.querySelector('p:nth-child(3)').textContent.trim().split(': ')[1];
    const aiHairStyle = aiSelectedCardElement.querySelector('p:nth-child(4)').textContent.trim().split(': ')[1];
    const aiHairLength = aiSelectedCardElement.querySelector('p:nth-child(5)').textContent.trim().split(': ')[1];
    const aiFacialHair = aiSelectedCardElement.querySelector('p:nth-child(6)').textContent.trim().split(': ')[1];
    const aiAccessory = aiSelectedCardElement.querySelector('p:nth-child(7)').textContent.trim().split(': ')[1];
    const aiHeadwear = aiSelectedCardElement.querySelector('p:nth-child(8)').textContent.trim().split(': ')[1];
    const aiSkin = aiSelectedCardElement.querySelector('p:nth-child(9)').textContent.trim().split(': ')[1];
    const aiClothesColor = aiSelectedCardElement.querySelector('p:nth-child(10)').textContent.trim().split(': ')[1];


    // Store AI selected card details
    aiSelectedCard = {
        gender: aiGender,
        haircolor: aiHairColor,
        hairstyle: aiHairStyle,
        hairlength: aiHairLength,
        facialhair: aiFacialHair,
        headwear: aiHeadwear,
        skin: aiSkin,
        clothescolor: aiClothesColor,
        accessory: aiAccessory,
        imageSrc: aiSelectedCardElement.querySelector('img').src,
        altText: aiSelectedCardElement.querySelector('img').alt
    };



    const aiSelectedCardContainer = document.querySelector('#ai-selected-card .card');
    const aiSelectedCardHTML = `
        <div class="card" style="margin-right:50px; width:200px;height:300px;display:none">
            <img src="${aiSelectedCard.imageSrc}" alt="${aiSelectedCard.altText}">
        </div>
        <div class="attributes" style="font-size:15px; display:none" >
            <p>Gender: ${aiSelectedCard.gender}</p>
            <p>Hair Color: ${aiSelectedCard.haircolor}</p>
            <p>Hair Style: ${aiSelectedCard.hairstyle}</p>
            <p>Hair Length: ${aiSelectedCard.hairlength}</p>
            <p>Eyes: ${aiSelectedCard.eyes}</p>
            <p>Skin: ${aiSelectedCard.skin}</p>
            <p>Facial Hair: ${aiSelectedCard.facialhair}</p>
            <p>Headwear: ${aiSelectedCard.headwear}</p>
            <p>Accessory: ${aiSelectedCard.accessory}</p>
            <p>Clothes Color: ${aiSelectedCard.clothescolor}</p>
        </div>
    `;
    aiSelectedCardContainer.innerHTML = aiSelectedCardHTML;

    // Display AI selected card section
    document.getElementById('ai-selected-card').style.display = 'none';
}
function cancelSelection() {
    document.getElementById('confirmation-modal').style.display = 'none';
}
function startGame() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('main-game-container').style.display = 'flex';
    document.getElementById('score').style.display = 'flex';

}



//Functions responsible for handling cards
function resetGame() {
    // Hide the game over modal
    document.getElementById('game-over-modal').style.display = 'none';

    // Reset game variables
    selectedCard = null;
    points = 0; // Reset points to 0
    lies = 0;
    userTurn = true;
    aiCard = {}; // Reset AI's selected card details

    // Reset UI elements
    document.getElementById('points').innerText = points; // Update points display
    document.getElementById('lies').innerText = lies;
    document.getElementById('chat-history').innerHTML = '';
    document.getElementById('selected-card').style.display = 'none';
    document.getElementById('ai-question-popup').style.display = 'none';

    // Hide the main game container and show the initial game container
    document.getElementById('main-game-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';
    document.getElementById('score').style.display = 'none';

    clearInterval(timer); // Stop the timer if it's running
    resetMarkedCards(); // Reset marked cards

    // Reset selected cards and AI's card
    selectedCard = null;
    const selectedCardContainer = document.getElementById('selected-card');
    selectedCardContainer.style.display = 'none';
    const aiSelectedCardContainer = document.getElementById('ai-selected-card');
    aiSelectedCardContainer.style.display = 'none';


}
function resetMarkedCards() {
    // Select all marked and eliminated cards in the main game section
    selectedCards.forEach(card => {
        card.classList.remove('marked');
        card.style.backgroundColor = '';
    });
    selectedCards = [];

    eliminatedCards.forEach(cardIndex => {
        const cardElement = document.querySelector(`#left-section .cards .card:nth-child(${cardIndex})`);
        cardElement.classList.remove('eliminated');
        const markElement = cardElement.querySelector('.eliminate-mark');
        if (markElement) markElement.remove();
        cardElement.style.backgroundColor = '';
    });
    eliminatedCards.clear();
    document.getElementById('points').innerText = score;


    const markedCards = document.querySelectorAll('#main-left-section .card.marked, #main-left-section .card.eliminated');
    markedCards.forEach(card => {
        card.classList.remove('marked');
        card.classList.remove('eliminated');
        card.style.backgroundColor = ''; // Reset background color to default
        const markElement = card.querySelector('.eliminate-mark');
        if (markElement) {
            markElement.remove(); // Remove the X mark if present
        }
    });

    // Clear eliminated cards and update score as needed
    eliminatedCards.clear();
    selectedCards = [];
    score = 0;
    document.getElementById('points').innerText = score;
}
function toggleMark(cardElement) {
    const cardIndex = Array.from(cardElement.parentNode.children).indexOf(cardElement) + 1;

    if (eliminatedCards.has(cardIndex)) {
        // If card is eliminated, revert it to default state
        cardElement.classList.remove('eliminated');
        const markElement = cardElement.querySelector('.eliminate-mark');
        if (markElement) markElement.remove();
        cardElement.style.backgroundColor = '';
        eliminatedCards.delete(cardIndex);
        score -= 100; // Deduct points when a card is toggled back
    } else {
        // Toggle mark (green background)
        if (cardElement.classList.contains('marked')) {
            cardElement.classList.remove('marked');
            cardElement.style.backgroundColor = '';
            const index = selectedCards.indexOf(cardElement);
            if (index !== -1) {
                selectedCards.splice(index, 1);
            }
        } else {
            cardElement.classList.add('marked');
            cardElement.style.backgroundColor = '#6aff00';
            selectedCards.push(cardElement);
        }
    }
    document.getElementById('points').innerText = score;
}
function eliminateCards() {
    selectedCards.forEach(card => {
        const cardIndex = Array.from(card.parentNode.children).indexOf(card) + 1;
        if (!eliminatedCards.has(cardIndex)) {
            if (!card.querySelector('.eliminate-mark')) {
                const markX = document.createElement('p');
                markX.textContent = 'X';
                markX.style.color = 'red';
                markX.style.fontWeight = 'bold';
                markX.classList.add('eliminate-mark');
                card.appendChild(markX);
            }
            card.style.backgroundColor = 'red'; // Ensure background color stays red
            card.classList.add('eliminated');
            eliminatedCards.add(cardIndex);
            score += 100; // Add 100 points for each eliminated card
        }
        card.classList.remove('marked');
    });
    selectedCards = []; // Clear the selectedCards array
    document.getElementById('points').innerText = score;

    // Trigger AI question after eliminating cards
    promptAITurn();
}
function showAttributes(card) {
    const attributesDiv = document.getElementById('attributes');
    const paragraphs = card.querySelectorAll('p');
    let text = '';
    paragraphs.forEach(p => {
        text += p.innerText + '<br>';
    });
    attributesDiv.innerHTML = text;
    attributesDiv.style.display = 'block';
    attributesDiv.style.top = card.getBoundingClientRect().top + 'px';
    attributesDiv.style.left = card.getBoundingClientRect().right + 'px';
}
function hideAttributes() {
    const attributesDiv = document.getElementById('attributes');
    attributesDiv.style.display = 'none';
}

//Functions responsible for all the questions
function getQuestionsByCategory(category) {
    switch (category) {
        case 'haircolor':
            return [
                'Does the character have brown hair?',
                'Does the character have black hair?',
                'Does the character have blonde hair?',
                'Does the character have red hair?'
            ];
        case 'hairstyle':
            return [
                'Does the character have wavy hair style?',
                'Does the character have curly hair style?',
                'Does the character have straight hair style?'
            ];
        case 'hairlength':
            return [
                'Does the character have short length hair?',
                'Does the character have medium length hair?',
                'Does the character have long length hair?'
            ];
        case 'facialhair':
            return [
                'Does the character have facial hair?',
            ];
        case 'headwear':
            return [
                'Does the character have headware?'
            ];
        case 'clothescolor':
            return [
                'Is the character wearing red clothes?',
                'Is the character wearing yellow clothes?',
                'Is the character wearing green clothes?',
                'Is the character wearing purple clothes?',
                'Is the character wearing pink clothes?',
                'Is the character wearing white clothes?',
                'Is the character wearing blue clothes?',
                'Is the character wearing black clothes?'
            ];
        case 'skin':
            return [
                'Does the character have fair skin?',
                'Does the character have light skin?',
                'Does the character have olive skin?',
                'Does the character have dark skin?',
                'Does the character have tan skin?'
            ];
        case 'accessory':
            return [
                'Does the character dont have accessory?',
                'Is the character wearing a necklace?',
                'Is the character wearing eyeglasses?',
                'Is the character wearing a watch?',
                'Is the character wearing earrings?',
                'Is the character wearing sunglasses?',
                'Is the character wearing a bracelet?',
                'Is the character wearing a scarf?'
            ];

        case 'gender':
            return [
                'Is the character gender male?',
                'Is the character gender female?',

            ];

        default:
            return [];
    }
}
function displayQuestions(category) {
    const questionsList = document.getElementById('question-list');
    questionsList.innerHTML = ''; // Clear previous questions

    questions[category].forEach(question => {
        const listItem = document.createElement('li');
        listItem.textContent = question;
        listItem.addEventListener('click', function () {
            askQuestion(question);
        });
        questionsList.appendChild(listItem);
    });

    currentQuestionCategory = category;
}
function submitAnswer() {
    const userQuestion = document.getElementById('user-input').value.trim();
    if (userQuestion !== '') {
        const questionList = document.getElementById('chat-history');

        // Create user question message
        const userQuestionMessage = document.createElement('div');
        userQuestionMessage.classList.add('chat-message');
        userQuestionMessage.innerHTML = `
            <p><strong>User:</strong> ${userQuestion}</p>
        `;
        questionList.appendChild(userQuestionMessage);

        // Trigger AI response
        answerAIQuestion(userQuestion);

        document.getElementById('user-input').value = '';
    }
}
function askQuestion(question) {
    const chatHistory = document.getElementById('chat-history');

    if (userTurn) {
        const userQuestion = `<p><strong>User:</strong> ${question}</p>`;
        chatHistory.innerHTML += userQuestion;

        const aiResponse = simulateAIResponse(question);
        const aiResponseHtml = `<p><strong>AI:</strong> ${aiResponse}</p>`;
        chatHistory.innerHTML += aiResponseHtml;

        userTurn = false;

    }
}



// Decision Tree Algorithm for Ai generated Question
const decisionTree = {
    'haircolor': {
        'red': ['red'],
        'blonde': ['blonde'],
        'black': ['black'],
        'brown': ['brown'],
        'gray': ['gray'] // added gray hair
    },
    'gender': {
        'male': ['male'],
        'female': ['female']
    },
    'skin': {
        'fair': ['fair'],
        'light': ['light'],
        'olive': ['olive'],
        'dark': ['dark'],
        'tan': ['tan']
    },
    'accessory': {
        'no': ['no'],
        'necklace': ['necklace'],
        'eyeglasses': ['eyeglasses'],
        'watch': ['watch'],
        'earrings': ['earrings'],
        'sunglasses': ['sunglasses'],
        'bracelet': ['bracelet'],
        'scarf': ['scarf']
    },
    'hairstyle': {
        'wavy': ['wavy'],
        'curly': ['curly'],
        'straight': ['straight']
    },
    'hairlength': {
        'short': ['short'],
        'medium': ['medium'],
        'long': ['long']
    },
    'facialhair': {
        'yes': ['yes'],
        'no': ['no']
    },
    'headwear': {
        'yes': ['yes'],
        'no': ['no']
    },
    'clothescolor': {
        'red': ['red'],
        'yellow': ['yellow'],
        'green': ['green'],
        'purple': ['purple'],
        'pink': ['pink'],
        'white': ['white'],
        'blue': ['blue'],
        'black': ['black']
    }
};
function generateAIQuestion() {
    // Generate AI question based on remaining cards and decision tree
    const bestQuestion = findBestQuestion();
    return bestQuestion;
}
function findBestQuestion() {
    let bestQuestion = null;
    let bestQuestionEffectiveness = 0;

    for (const [attribute, options] of Object.entries(decisionTree)) {
        const validOptions = Object.keys(options).filter(option =>
            remainingCards.some(cardId => getCardById(cardId)[attribute] === option)
        );

        if (validOptions.length === 0) continue;

        // Calculate effectiveness of this question
        const effectiveness = validOptions.reduce((total, option) => {
            const yesCount = remainingCards.filter(cardId => getCardById(cardId)[attribute] === option).length;
            const noCount = remainingCards.length - yesCount;
            return total + Math.min(yesCount, noCount);
        }, 0);

        if (effectiveness > bestQuestionEffectiveness) {
            bestQuestionEffectiveness = effectiveness;
            bestQuestion = `Does the character have ${validOptions[0]} ${attribute}?`;
        }
    }

    return bestQuestion || "No more questions available";
}
function filterCards(question, answer) {
    const category = getCategoryFromQuestion(question);
    if (!category) return;

    const option = question.match(/have (\w+) (\w+)/)[1];
    const initialCount = remainingCards.length;

    remainingCards = remainingCards.filter(cardId => {
        const card = getCardById(cardId);
        const attribute = card[category].toLowerCase();
        const match = answer ? attribute.includes(option) : !attribute.includes(option);
        return match;
    });

    updateEliminateDiv(initialCount);
}
function getCategoryFromQuestion(question) {
    const categories = ['skin', 'accessory', 'gender', 'haircolor', 'hairstyle', 'hairlength', 'facialhair', 'headwear', 'clothescolor'];
    return categories.find(category => question.toLowerCase().includes(category));
}
function showAIGuess(card) {

    const modal = document.getElementById('ai-guess-modal');
    const guessText = document.getElementById('ai-guess-text');
    const guessImage = document.getElementById('ai-guess-image');


    guessText.innerHTML = `
    <p>Gender: ${card.gender}</p>
    <p>Hair Color: ${card.haircolor}</p>
    <p>Hair Style: ${card.hairstyle}</p>
    <p>Hair Length: ${card.hairlength}</p>
    <p>Facial Hair: ${card.facialhair}</p>
    <p>Accessory: ${card.accessory}</p>
    <p>Headwear: ${card.headwear}</p>
    <p>Skin: ${card.skin}</p>
    <p>Clothes Color: ${card.clothescolor}</p>
`;



    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.4)';
    modal.style.alignItems = 'center'; // Center vertically
    modal.style.justifyContent = 'center'; // Center horizontally


    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.backgroundColor = 'rgba(0,0,0,0.4)';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.border = '1px solid #888';
    modalContent.style.width = '80%';
    modalContent.style.maxWidth = '500px';
    modalContent.style.color = 'black';
    modalContent.style.textAlign = 'center';
    modalContent.style.position = 'relative';

    // Apply styles to the close button
    const closeButton = modalContent.querySelector('.close-button');
    closeButton.style.color = '#aaa';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.fontSize = '28px';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.cursor = 'pointer';


    closeButton.addEventListener('mouseover', function () {
        closeButton.style.color = 'black';
    });

    closeButton.addEventListener('mouseout', function () {
        closeButton.style.color = '#aaa';
    });

}
function closeAIGuessModal() {
    document.getElementById('ai-guess-modal').style.display = 'none';
}
function getCardById(id) {
    const cards = {
        1: { skin: 'dark', accessory: 'watch', gender: 'male', haircolor: 'brown', hairstyle: 'straight', hairlength: 'medium', facialhair: 'yes', headwear: 'no', clothescolor: 'red, yellow' },
        2: { skin: 'tan', accessory: 'earrings', gender: 'female', haircolor: 'black', hairstyle: 'straight', hairlength: 'medium', facialhair: 'no', headwear: 'yes', clothescolor: 'green' },
        3: { skin: 'fair', accessory: 'watch', gender: 'male', haircolor: 'blonde', hairstyle: 'wavy', hairlength: 'short', facialhair: 'yes', headwear: 'no', clothescolor: 'black, white' },
        4: { skin: 'light', accessory: 'necklace', gender: 'female', haircolor: 'red', hairstyle: 'curly', hairlength: 'long', facialhair: 'no', headwear: 'no', clothescolor: 'pink, purple' },
        5: { skin: 'olive', accessory: 'sunglasses', gender: 'male', haircolor: 'brown', hairstyle: 'straight', hairlength: 'medium', facialhair: 'no', headwear: 'no', clothescolor: 'yellow, white' },
        6: { skin: 'fair', accessory: 'bracelet', gender: 'female', haircolor: 'blonde', hairstyle: 'wavy', hairlength: 'long', facialhair: 'no', headwear: 'yes', clothescolor: 'blue' },
        7: { skin: 'dark', accessory: 'no', gender: 'male', haircolor: 'black', hairstyle: 'curly', hairlength: 'short', facialhair: 'yes', headwear: 'no', clothescolor: 'red, black' },
        8: { skin: 'light', accessory: 'scarf', gender: 'female', haircolor: 'brown', hairstyle: 'straight', hairlength: 'short', facialhair: 'no', headwear: 'no', clothescolor: 'white, blue' },
        9: { skin: 'fair', accessory: 'no', gender: 'male', haircolor: 'gray', hairstyle: 'wavy', hairlength: 'medium', facialhair: 'yes', headwear: 'yes', clothescolor: 'green, black' },
        10: { skin: 'olive', accessory: 'earrings', gender: 'female', haircolor: 'black', hairstyle: 'curly', hairlength: 'long', facialhair: 'no', headwear: 'yes', clothescolor: 'yellow' },
        11: { skin: 'fair', accessory: 'watch', gender: 'male', haircolor: 'blonde', hairstyle: 'straight', hairlength: 'short', facialhair: 'no', headwear: 'no', clothescolor: 'blue, red' },
        12: { skin: 'tan', accessory: 'necklace', gender: 'female', haircolor: 'red', hairstyle: 'wavy', hairlength: 'medium', facialhair: 'no', headwear: 'no', clothescolor: 'pink' },
        13: { skin: 'light', accessory: 'sunglasses', gender: 'male', haircolor: 'brown', hairstyle: 'curly', hairlength: 'long', facialhair: 'yes', headwear: 'no', clothescolor: 'black, white' },
        14: { skin: 'olive', accessory: 'bracelet', gender: 'female', haircolor: 'blonde', hairstyle: 'straight', hairlength: 'long', facialhair: 'no', headwear: 'yes', clothescolor: 'yellow, green' },
        15: { skin: 'dark', accessory: 'necklace', gender: 'male', haircolor: 'black', hairstyle: 'wavy', hairlength: 'short', facialhair: 'yes', headwear: 'yes', clothescolor: 'blue' },
        16: { skin: 'fair', accessory: 'earrings', gender: 'female', haircolor: 'red', hairstyle: 'straight', hairlength: 'medium', facialhair: 'no', headwear: 'no', clothescolor: 'white, blue' },
        17: { skin: 'light', accessory: 'watch', gender: 'male', haircolor: 'gray', hairstyle: 'curly', hairlength: 'short', facialhair: 'yes', headwear: 'no', clothescolor: 'black, red' },
        18: { skin: 'olive', accessory: 'scarf', gender: 'female', haircolor: 'blonde', hairstyle: 'wavy', hairlength: 'long', facialhair: 'no', headwear: 'no', clothescolor: 'blue, pink' },
        19: { skin: 'fair', accessory: 'necklace', gender: 'male', haircolor: 'brown', hairstyle: 'straight', hairlength: 'short', facialhair: 'yes', headwear: 'yes', clothescolor: 'green, yellow' },
        20: { skin: 'dark', accessory: 'bracelet', gender: 'female', haircolor: 'black', hairstyle: 'curly', hairlength: 'medium', facialhair: 'no', headwear: 'yes', clothescolor: 'red, blue' }
    };

    return cards[id];
}
function updateEliminateDiv(initialCount) {
    const eliminatedCount = initialCount - remainingCards.length;
    document.getElementById('eliminated').innerText = eliminatedCount;
}



//Ai Question and Answer Checking
function promptAITurn() {
    const aiQuestion = generateAIQuestion();
    const chatHistory = document.getElementById('chat-history');
    const aiQuestionHtml = `<p><strong>AI:</strong> ${aiQuestion}</p>`;

    // Update the AI question text and the user selected card details
    document.getElementById('ai-question-text').textContent = aiQuestion;
    document.getElementById('user-selected-card-container').innerHTML = `
        <h3>User's Selected Card</h3>
        <div class="user-selected-card" style="display: flex;">
            <div class="card" style="margin-right:50px; width:200px;height:300px;">
                <img src="${userSelectedCard.imageSrc}" alt="${userSelectedCard.altText}" style="width: 100%;height: 100%; object-fit: cover;">
            </div>
            <div class="attributes" style="font-size:15px">
                <p>Gender: ${userSelectedCard.gender}</p>
                <p>Hair Color: ${userSelectedCard.haircolor}</p>
                <p>Hair Style: ${userSelectedCard.hairstyle}</p>
                <p>Hair Length: ${userSelectedCard.hairlength}</p>
                <p>Facial Hair: ${userSelectedCard.facialhair}</p>
                <p>Headwear: ${userSelectedCard.headwear}</p>
                <p>Skin: ${userSelectedCard.skin}</p>
                <p>Clothes Color: ${userSelectedCard.clothescolor}</p>
                <p>Accessory: ${userSelectedCard.accessory}</p>
            </div>
        </div>
    `;

    chatHistory.innerHTML += aiQuestionHtml;

    // Show the AI question popup
    document.getElementById('ai-question-popup').style.display = 'flex';
}
function answerAIQuestion(answer) {
    const aiQuestion = document.getElementById('ai-question-text').textContent;
    const chatHistory = document.getElementById('chat-history');
    const userResponse = `<p><strong>User:</strong> ${answer ? 'Yes' : 'No'}</p>`;
    chatHistory.innerHTML += userResponse;

    console.log("AI Question:", aiQuestion);
    console.log("User Answer:", answer ? 'Yes' : 'No');

    // Check if the answer is correct
    const isCorrect = checkAnswer(aiQuestion, answer);

    // Log details about the correctness check
    console.log("Is Correct:", isCorrect);

    if (!isCorrect) {
        lies++;
        points -= 300;
        console.log("Incorrect Answer - Lies Incremented:", lies);
    } else {
        points += 100;
        console.log("Correct Answer - Points Incremented:", points);
    }

    filterCards(aiQuestion, answer);


    document.getElementById('ai-question-popup').style.display = 'none';


    document.getElementById('lies').innerText = lies;
    document.getElementById('points').innerText = points;

    if (lies >= 2) {
        document.getElementById('game-over-modal').style.display = 'flex';
        showGameOverModal();
        console.log("Game Over - Lies:", lies);
        return;
    }

    if (remainingCards.length === 1) {
        const finalCard = getCardById(remainingCards[0]);
        showAIGuess(finalCard);
        return;
    }

    userTurn = true;
}
function checkAnswer(question, answer) {
    const cardAttributes = {
        skin: userSelectedCard.skin.toLowerCase(),
        accessory: userSelectedCard.accessory.toLowerCase(),
        gender: userSelectedCard.gender.toLowerCase(),
        haircolor: userSelectedCard.haircolor.toLowerCase(),
        hairstyle: userSelectedCard.hairstyle.toLowerCase(),
        hairlength: userSelectedCard.hairlength.toLowerCase(),
        facialhair: userSelectedCard.facialhair.toLowerCase(),
        headwear: userSelectedCard.headwear.toLowerCase(),
        clothescolor: userSelectedCard.clothescolor.toLowerCase()
    };

    console.log("Card Attributes:", cardAttributes); // Log card attributes

    const questionMap = {
        'skin': ['fair', 'light', 'olive', 'dark', 'tan'],
        'accessory': ['no', 'necklace', 'eyeglasses', 'watch', 'earrings', 'sunglasses', 'bracelet', 'scarf'],
        'gender': ['male', 'female'],
        'haircolor': ['red', 'blonde', 'black', 'brown', 'gray'],
        'hairstyle': ['wavy', 'curly', 'straight'],
        'hairlength': ['short', 'medium', 'long'],
        'facialhair': ['yes', 'no'],
        'headwear': ['yes', 'no'],
        'clothescolor': ['red', 'yellow', 'green', 'purple', 'pink', 'white', 'blue', 'black']
    };

    console.log("Question Map:", questionMap); // Log the question map

    let isCorrect = false;

    // Extract the category and option from the question
    const category = getCategoryFromQuestion(question);
    const option = getValueFromQuestion(question);
    if (!category || !option || !questionMap[category]) return isCorrect; // Exit if category or option is not found

    // Convert option to lowercase for comparison
    const formattedOption = option.toLowerCase();
    const actualValue = cardAttributes[category];
    console.log(`Checking ${category} for option "${formattedOption}" - Actual Value:`, actualValue); // Log the category, option, and actual value

    if (category === 'accessory') {
        // For 'accessory', check if the actual value contains the option, considering multiple values
        isCorrect = (answer && actualValue.split(', ').some(a => a.includes(formattedOption))) || (!answer && !actualValue.split(', ').some(a => a.includes(formattedOption)));
    } else {
        // For other attributes, check if the actual value matches the option
        isCorrect = answer ? actualValue.includes(formattedOption) : !actualValue.includes(formattedOption);
    }

    console.log("Current Is Correct:", isCorrect); // Log the result of the correctness check
    return isCorrect;
}
function getValueFromQuestion(question) {
    const match = question.match(/have (\w+)/);
    return match ? match[1].toLowerCase() : null;
}
//Functions responsible when user ask ai a question
function simulateAIResponse(question) {
    // Convert the question to lowercase for case-insensitive comparison
    const lowerCaseQuestion = question.toLowerCase();
    let isYes = false; // Default to No

    // Helper function to check inclusion
    const includesCheck = (attribute, value) => {
        if (!aiSelectedCard[attribute]) return false;
        return aiSelectedCard[attribute].toLowerCase().includes(value.toLowerCase());
    };

    // Log the question and AI selected card for debugging
    console.log("Question:", question);
    console.log("AI Selected Card:", aiSelectedCard);

    // Check for general attributes first
    if (lowerCaseQuestion.includes('skin')) {
        isYes = lowerCaseQuestion.includes(aiSelectedCard.skin.toLowerCase());
    } else if (lowerCaseQuestion.includes('male') || lowerCaseQuestion.includes('female')) {
        isYes = lowerCaseQuestion.includes(aiSelectedCard.gender.toLowerCase());
    } else if (lowerCaseQuestion.includes('brown') || lowerCaseQuestion.includes('black') || lowerCaseQuestion.includes('blonde') || lowerCaseQuestion.includes('red')) {
        isYes = includesCheck('haircolor', lowerCaseQuestion.match(/brown|black|blonde|red/)[0]);
    } else if (lowerCaseQuestion.includes('wavy') || lowerCaseQuestion.includes('curly') || lowerCaseQuestion.includes('straight')) {
        isYes = includesCheck('hairstyle', lowerCaseQuestion.match(/wavy|curly|straight/)[0]);
    } else if (lowerCaseQuestion.includes('bald') || lowerCaseQuestion.includes('short') || lowerCaseQuestion.includes('medium') || lowerCaseQuestion.includes('long')) {
        isYes = includesCheck('hairlength', lowerCaseQuestion.match(/bald|short|medium|long/)[0]);
    } else if (lowerCaseQuestion.includes('facial hair')) {
        isYes = includesCheck('facialhair', 'Yes');
    } else if (lowerCaseQuestion.includes('red') || lowerCaseQuestion.includes('yellow') || lowerCaseQuestion.includes('green') || lowerCaseQuestion.includes('purple') || lowerCaseQuestion.includes('pink') || lowerCaseQuestion.includes('white') || lowerCaseQuestion.includes('blue')) {
        isYes = includesCheck('clothescolor', lowerCaseQuestion.match(/red|yellow|green|purple|pink|white|blue/)[0]);
    } else if (lowerCaseQuestion.includes('headwear')) {
        // Properly check the headwear attribute
        isYes = aiSelectedCard.headwear && aiSelectedCard.headwear.toLowerCase() === 'yes';
    } else if (lowerCaseQuestion.includes('necklace') || lowerCaseQuestion.includes('eyeglasses') || lowerCaseQuestion.includes('watch') || lowerCaseQuestion.includes('earrings') || lowerCaseQuestion.includes('sunglasses') || lowerCaseQuestion.includes('bracelet') || lowerCaseQuestion.includes('scarf')) {
        // Check for specific accessories
        const accessory = lowerCaseQuestion.match(/necklace|eyeglasses|watch|earrings|sunglasses|bracelet|scarf/)[0];
        isYes = includesCheck('accessory', accessory);
    } else {
        // Default case if none of the specific checks match
        isYes = false;
    }

    // Determine the response text
    const aiResponse = isYes ? 'yes' : 'no';

    // Log the final decision
    console.log("Response:", aiResponse);

    // Display AI response in the popup
    document.getElementById('ai-response-text').textContent = aiResponse;
    document.getElementById('ai-response-popup').style.display = 'flex';

    // Hide the popup after 3 seconds (3000 milliseconds)
    setTimeout(() => {
        document.getElementById('ai-response-popup').style.display = 'none';
    }, 3000);

    return aiResponse; // Return the response text
}
function submitAnswer() {
    const userQuestion = document.getElementById('user-input').value.trim();
    if (userQuestion !== '') {
        const questionList = document.getElementById('chat-history');

        // Create user question message
        const userQuestionMessage = document.createElement('div');
        userQuestionMessage.classList.add('chat-message');
        userQuestionMessage.innerHTML = `<p><strong>User:</strong> ${userQuestion}</p>`;
        questionList.appendChild(userQuestionMessage);

        // Trigger AI response and display in popup
        answerAIQuestion(userQuestion);

        document.getElementById('user-input').value = '';
    }
}



// Function to for user to guess ai selected card
function showPopup(message, callback) {
    const resultModal = document.getElementById('result-modal');
    resultModal.innerHTML = `
        <div class="popup-content">
            <p>${message}</p>
            <button onclick="closePopup(${callback ? callback.name : ''})">OK</button>
        </div>
    `;
    resultModal.style.display = 'flex';
}
function closePopup(callback) {
    document.getElementById('result-modal').style.display = 'none';
    if (callback) callback();
}
function guessSuspect() {
    if (selectedCards.length === 0) {
        showPopup("You must select a card first.");
        return;
    }

    if (selectedCards.length > 1) {
        showPopup("You cannot suspect multiple cards.");
        return;
    }

    // Extract attributes from the selected card
    const cardElement = selectedCards[0];
    const cardSrc = cardElement.querySelector('img').src;
    const attributes = {
        gender: cardElement.querySelector('p:nth-child(2)').textContent.trim().slice(8),
        haircolor: cardElement.querySelector('p:nth-child(3)').textContent.trim().slice(12),
        hairstyle: cardElement.querySelector('p:nth-child(4)').textContent.trim().slice(12),
        hairlength: cardElement.querySelector('p:nth-child(5)').textContent.trim().slice(13),
        facialhair: cardElement.querySelector('p:nth-child(6)').textContent.trim().slice(13),
        accessory: cardElement.querySelector('p:nth-child(7)').textContent.trim().slice(11),
        headwear: cardElement.querySelector('p:nth-child(8)').textContent.trim().slice(10),
        skin: cardElement.querySelector('p:nth-child(9)').textContent.trim().slice(6),
        clothescolor: cardElement.querySelector('p:nth-child(10)').textContent.trim().slice(16)
    };

    guessedCard = { imageSrc: cardSrc, ...attributes };

    // Show confirmation modal for the selected card
    const confirmationModal = createConfirmationModal(cardSrc);
    document.body.appendChild(confirmationModal);
    confirmationModal.style.display = 'flex';
}
function createConfirmationModal(cardSrc) {
    const confirmationModal = document.createElement('div');
    confirmationModal.classList.add('confirmation-modal');
    confirmationModal.innerHTML = `
        <div class="popup-content">
            <h3 style="color:white ">Are you sure you want to choose this card?</h3>
            <img src="${cardSrc}" alt="Suspected Card" class="suspected-card">
            <div class="buttons">
                <button style= "background-color: #ac0a0a;border: none;color: white;" onclick="confirmGuess()">Yes</button>
                <button  style= "background-color: #ac0a0a;border: none;color: white;"  onclick="closeConfirmationModal()">No</button>
            </div>
        </div>
    `;
    return confirmationModal;
}
function closeConfirmationModal() {
    const confirmationModal = document.querySelector('.confirmation-modal');
    if (confirmationModal) {
        confirmationModal.style.display = 'none';
        confirmationModal.remove();
    }
}
function confirmGuess() {
    closeConfirmationModal();

    if (!guessedCard || !aiSelectedCard) {
        showPopup("An error occurred. Please try again.");
        return;
    }

    // Debugging: Log the guessed card and AI selected card
    console.log("Guessed Card:", guessedCard);
    console.log("AI Selected Card:", aiSelectedCard);

    // Compare attributes
    const attributesMatch = (
        guessedCard.gender === aiSelectedCard.gender &&
        guessedCard.haircolor === aiSelectedCard.haircolor &&
        guessedCard.hairstyle === aiSelectedCard.hairstyle &&
        guessedCard.hairlength === aiSelectedCard.hairlength &&
        guessedCard.facialhair === aiSelectedCard.facialhair &&
        guessedCard.accessory === aiSelectedCard.accessory &&
        guessedCard.headwear === aiSelectedCard.headwear &&
        guessedCard.skin === aiSelectedCard.skin &&
        guessedCard.clothescolor === aiSelectedCard.clothescolor
    );

    // Debugging: Log the result of the attribute comparison
    console.log("Attributes Match:", attributesMatch);

    if (attributesMatch) {
        showPopup("Congratulations Detective! You have correctly identified the suspect.", resetGame);
    } else {
        document.getElementById('game-over-modal').style.display = 'flex';
        showGameOverModal();
    }
}
function unselectCards() {
    selectedCards.forEach(card => {
        card.classList.remove('marked');
        card.style.backgroundColor = '';
    });
    selectedCards = [];

    eliminatedCards.forEach(cardIndex => {
        const cardElement = document.querySelector(`#left-section .cards .card:nth-child(${cardIndex})`);
        cardElement.classList.remove('eliminated');
        const markElement = cardElement.querySelector('.eliminate-mark');
        if (markElement) markElement.remove();
        cardElement.style.backgroundColor = '';
    });
    eliminatedCards.clear();
    document.getElementById('points').innerText = score;
}
function showGameOverModal() {
    var modal = document.getElementById('game-over-modal');
    var audio = document.getElementById('game-over-music');

    // Show the modal
    modal.style.display = 'flex';

    // Play the music once
    audio.currentTime = 0; // Reset the audio to the start
    audio.play();
}



document.getElementById('question-skin').addEventListener('click', function () {
    displayQuestions('skin');
});

document.getElementById('question-accessory').addEventListener('click', function () {
    displayQuestions('accessory');
});

document.getElementById('question-gender').addEventListener('click', function () {
    displayQuestions('gender');
});

document.getElementById('question-haircolor').addEventListener('click', function () {
    displayQuestions('haircolor');
});

document.getElementById('question-hairstyle').addEventListener('click', function () {
    displayQuestions('hairstyle');
});

document.getElementById('question-hairlength').addEventListener('click', function () {
    displayQuestions('hairlength');
});

document.getElementById('question-facialhair').addEventListener('click', function () {
    displayQuestions('facialhair');
});

document.getElementById('question-headwear').addEventListener('click', function () {
    displayQuestions('headwear');
});

document.getElementById('question-clothescolor').addEventListener('click', function () {
    displayQuestions('clothescolor');
});












