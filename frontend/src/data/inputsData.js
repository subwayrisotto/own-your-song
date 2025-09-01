const inputsData = {
    step1: [ 
        {
            title: '',
            placeholder: 'A funny story (e.g., “how we lost our car in the parking lot”)...',
            type: 'text',
            variableName: 'funnyStory',
        }, 
        {
            title: '',
            placeholder: 'Character traits (e.g., “always supportive and inspiring”)...',
            type: 'text',
            variableName: 'characterTraits',
        }, 
        {
            title: '',
            placeholder: 'Hobbies or dreams (e.g., “dreams of seeing Paris”)...',
            type: 'text',
            variableName: 'hobbies',
        },
    ],
    step2: [ 
        {
            title: 'Write your e-mail',
            placeholder: 'e.g., johnsmith@outlook.com',
            type: 'email',
            variableName: 'email',
        }, 
        {
            title: 'Confirm your e-mail',
            placeholder: 'e.g., johnsmith@outlook.com',
            type: 'email',
            variableName: 'confirmEmail',
        }, 
        {
            title: 'What’s your name?',
            placeholder: 'e.g., John Smith',
            type: 'text',
            variableName: 'name',
        }, 
        {
            title: 'Recipient’s Name',
            placeholder: 'e.g., Monica Smith',
            type: 'text',
            variableName: 'recipient',
        },
        {
            title: 'Who is this person to you?',
            placeholder: 'e.g., wife, daughter, friend',
            type: 'text',
            variableName: 'recipientRole',
        },
    ],
    step3: [ 
        {
            title: 'Mood of the song',
            placeholder: 'Choose the main mood of the composition.',
            type: 'select',
            isAllowedForSilver: true,
            options: [
                "Romantic", "Cheerful and energetic", "Sad / Lyrical", "Touching / Soulful", "Other"
            ],
            variableName: 'songMood'
        }, 
        {
            title: 'Select the style of the song',
            placeholder: 'Determines the overall mood of the composition',
            type: 'select',
            isAllowedForSilver: true,
            options: [
                "Romantic", "Cheerful and energetic", "Sad / Lyrical", "Motivational", "Other"
            ],
            variableName: 'songStyle'
        }, 
        {
            title: 'Select a song tempo',
            placeholder: 'Determines the speed and rhythm of music.',
            type: 'select',
            isAllowedForSilver: true,
            options: [
                "Slow (ballad)", "Medium (pop, light music)", "Fast (dance or drive track)"
            ],
            variableName: 'songTempo'
        },
        {
            title: 'Select the instruments for the song',
            isAllowedForSilver: true,
            multiplyElements: [
                {
                    plan: 'silver',
                    number: 1
                },
                {
                    plan: 'gold',
                    number: 3
                },
                {
                    plan: 'platinum',
                    number: 5
                }
            ],
            placeholder: 'Choose instruments for the song',
            type: 'select-multiply-elements',
            options: [
                "Piano", "Guitar (acoustic/electric)", "Percussion", "Violin","Saxophone","Synthesizer","Other"
            ],
            variableName: 'instruments'
        },
    ],
    step4: [
        {
            title: 'Write your story',
            placeholder: 'Write your story...',
            type: 'textarea',
            variableName: 'story',
            numbersOfCharacters: [
                {
                    plan: 'silver',
                    number: 100
                },
                {
                    plan: 'gold',
                    number: 300
                },
                {
                    plan: 'platinum',
                    number: 'unlimited'
                }
            ]
        },
        {
            title: 'Select song language',
            placeholder: 'e.g., English',
            type: 'select',
            variableName: 'songLanguage',
        },
    ]
}

export default inputsData;