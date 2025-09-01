const businessFormData = {
    step1: [ 
        {
            title: 'Company name',
            placeholder: 'Write you company name...',
            type: 'text',
            variableName: 'companyName',
        }, 
        {
            title: 'Job title',
            placeholder: 'Write your job title...',
            type: 'text',
            variableName: 'jobTitle',
        }, 
        {
            title: 'Contact person',
            placeholder: 'Write your contact person...',
            type: 'text',
            variableName: 'contactPerson',
        },
        {
            title: 'E-mail',
            placeholder: 'e.g., johnsmith@outlook.com',
            type: 'email',
            variableName: 'email',
        }, 
        {
            title: 'Phone number',
            placeholder: '+123456789',
            type: 'text',
            variableName: 'phone',
        }, 
    ],
    step2: [
        {
            title: 'Type of business',
            placeholder: 'Type of business',
            type: 'select',
            isAllowedForSilver: true,
            placeholder: 'Choose your business type',
            options: [
                "Retail store", "Fitness Center", "Spa", "Other"
            ],
            variableName: 'businessType'
        },
        {
            title: 'Goals of cooperation ',
            placeholder: 'Increase of average check',
            type: 'select',
            isAllowedForSilver: true,
            placeholder: 'Choose your goals of cooperation',
            options: [
                "Increase in average check", "Increase in sales of target positions", "Increasing brand awareness", "Creating a unique atmosphere", "Other"
            ],
            variableName: 'cooperationGoals'
        },
        {
            title: 'Solutions of interest',
            placeholder: 'Solutions of interest',
            type: 'select',
            isAllowedForSilver: true,
            placeholder: 'Choose your solutions of interests',
            options: [
                "Menu sound design", "Event package", "Personalized track for the establishment", "Adaptation of promotions into audio tracks"
            ],
            variableName: 'interestSolutions'
        },
    ],
    step3: [
        {
            title: 'Your wishes and comments',
            placeholder: 'Your wishes and comments...',
            type: 'textarea',
            variableName: 'comment',
            numbersOfCharacters: [
                {
                    plan: 'silver',
                    number: 'unlimited'
                },
                {
                    plan: 'gold',
                    number: 'unlimited'
                },
                {
                    plan: 'platinum',
                    number: 'unlimited'
                }
            ]
        },
    ]
}

export default businessFormData;